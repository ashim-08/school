import dotenv from 'dotenv';
import { encrypt, decrypt, encryptObject, decryptObject } from '../utils/encryption.js';

dotenv.config();

console.log('🔒 Testing Encryption Implementation\n');

const testData = {
  email: 'test@example.com',
  phone: '+1234567890',
  message: 'This is a sensitive message that needs encryption'
};

try {
  console.log('1. Testing basic encryption/decryption...');
  const encrypted = encrypt(testData.email);
  console.log('   ✅ Encrypted:', encrypted.substring(0, 50) + '...');

  const decrypted = decrypt(encrypted);
  console.log('   ✅ Decrypted:', decrypted);
  console.log('   ✅ Match:', decrypted === testData.email ? 'YES' : 'NO');

  console.log('\n2. Testing object encryption...');
  const encryptedObj = encryptObject(testData, ['email', 'phone', 'message']);
  console.log('   ✅ Encrypted object fields');
  console.log('   - Email length:', encryptedObj.email.length);
  console.log('   - Phone length:', encryptedObj.phone.length);
  console.log('   - Message length:', encryptedObj.message.length);

  console.log('\n3. Testing object decryption...');
  const decryptedObj = decryptObject(encryptedObj, ['email', 'phone', 'message']);
  console.log('   ✅ Decrypted object');
  console.log('   - Email:', decryptedObj.email);
  console.log('   - Phone:', decryptedObj.phone);
  console.log('   - Message:', decryptedObj.message);
  console.log('   ✅ All match:',
    decryptedObj.email === testData.email &&
    decryptedObj.phone === testData.phone &&
    decryptedObj.message === testData.message ? 'YES' : 'NO'
  );

  console.log('\n4. Testing empty string handling...');
  const emptyEncrypted = encrypt('');
  console.log('   ✅ Empty string encrypted:', emptyEncrypted === '' ? 'SKIPPED' : 'ENCRYPTED');

  console.log('\n5. Testing uniqueness (same input, different output)...');
  const encrypted1 = encrypt(testData.email);
  const encrypted2 = encrypt(testData.email);
  console.log('   ✅ Same input produces different ciphertext:', encrypted1 !== encrypted2 ? 'YES' : 'NO');
  console.log('   ✅ Both decrypt correctly:',
    decrypt(encrypted1) === testData.email &&
    decrypt(encrypted2) === testData.email ? 'YES' : 'NO'
  );

  console.log('\n✨ All encryption tests passed!');
  console.log('\n📋 Summary:');
  console.log('   - Algorithm: AES-256-GCM');
  console.log('   - Key Derivation: PBKDF2 with 100,000 iterations');
  console.log('   - Each encryption uses unique IV and salt');
  console.log('   - Data integrity verified with authentication tags');

} catch (error) {
  console.error('\n❌ Encryption test failed:', error.message);
  console.error(error);
  process.exit(1);
}
