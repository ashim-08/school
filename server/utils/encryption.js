import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const KEY_LENGTH = 32;
const ITERATIONS = 100000;

function getEncryptionKey() {
  const masterKey = process.env.ENCRYPTION_KEY;
  if (!masterKey) {
    throw new Error('ENCRYPTION_KEY not set in environment variables');
  }
  return masterKey;
}

function deriveKey(password, salt) {
  return crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha512');
}

export function encrypt(text) {
  if (!text || text === '') return '';

  try {
    const masterKey = getEncryptionKey();
    const salt = crypto.randomBytes(SALT_LENGTH);
    const key = deriveKey(masterKey, salt);
    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    const result = Buffer.concat([
      salt,
      iv,
      authTag,
      Buffer.from(encrypted, 'hex')
    ]).toString('base64');

    return result;
  } catch (error) {
    console.error('Encryption error:', error.message);
    throw new Error('Failed to encrypt data');
  }
}

export function decrypt(encryptedData) {
  if (!encryptedData || encryptedData === '') return '';

  try {
    const masterKey = getEncryptionKey();
    const buffer = Buffer.from(encryptedData, 'base64');

    const salt = buffer.subarray(0, SALT_LENGTH);
    const iv = buffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const authTag = buffer.subarray(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
    const encrypted = buffer.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);

    const key = deriveKey(masterKey, salt);

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'binary', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error.message);
    throw new Error('Failed to decrypt data');
  }
}

export function encryptObject(obj, fieldsToEncrypt) {
  const encrypted = { ...obj };

  for (const field of fieldsToEncrypt) {
    if (obj[field]) {
      encrypted[field] = encrypt(obj[field]);
    }
  }

  return encrypted;
}

export function decryptObject(obj, fieldsToDecrypt) {
  const decrypted = { ...obj };

  for (const field of fieldsToDecrypt) {
    if (obj[field]) {
      try {
        decrypted[field] = decrypt(obj[field]);
      } catch (error) {
        console.error(`Failed to decrypt field ${field}:`, error.message);
        decrypted[field] = '';
      }
    }
  }

  return decrypted;
}

export function generateEncryptionKey() {
  return crypto.randomBytes(32).toString('base64');
}
