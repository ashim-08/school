# End-to-End Encryption Implementation

## Overview

This system implements end-to-end encryption for sensitive personal information using AES-256-GCM encryption with PBKDF2 key derivation.

## Encrypted Fields

### Contact Model
- Email address
- Phone number
- Message content
- Reply content

### Teacher Model
- Email address
- Phone number

### Staff Model
- Email address
- Phone number

## Technical Details

### Encryption Algorithm
- **Algorithm**: AES-256-GCM (Galois/Counter Mode)
- **Key Derivation**: PBKDF2 with SHA-512
- **Iterations**: 100,000
- **IV Length**: 16 bytes (randomly generated per encryption)
- **Salt Length**: 64 bytes (randomly generated per encryption)
- **Authentication Tag**: 16 bytes (for data integrity verification)

### Security Features
1. **Unique encryption per field**: Each field value is encrypted with a unique IV and salt
2. **Authenticated encryption**: GCM mode provides both confidentiality and authenticity
3. **Key derivation**: Master key is derived using PBKDF2 for additional security
4. **Automatic encryption/decryption**: Mongoose getters and setters handle encryption transparently

## Setup Instructions

### 1. Environment Configuration

Ensure the `ENCRYPTION_KEY` is set in your `.env` file:

```bash
ENCRYPTION_KEY=your-base64-encoded-32-byte-key
```

**IMPORTANT**:
- Keep this key secure and never commit it to version control
- Use a different key for production
- If you lose this key, encrypted data cannot be recovered

### 2. Generate a New Encryption Key

To generate a new encryption key, run:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3. Migrate Existing Data

If you have existing unencrypted data, run the migration script:

```bash
node server/scripts/migrateEncryptedData.js
```

This will encrypt all existing sensitive fields in the database.

## Usage

### Automatic Encryption

The encryption is handled automatically by Mongoose. Simply use the models as usual:

```javascript
// Creating a new contact - data is automatically encrypted
const contact = new Contact({
  name: 'John Doe',
  email: 'john@example.com',  // Automatically encrypted
  phone: '1234567890',         // Automatically encrypted
  message: 'Hello!'            // Automatically encrypted
});
await contact.save();

// Reading data - automatically decrypted
const foundContact = await Contact.findById(contactId);
console.log(foundContact.email); // Automatically decrypted
```

### Manual Encryption/Decryption

If needed, you can use the encryption utilities directly:

```javascript
import { encrypt, decrypt } from './utils/encryption.js';

const encrypted = encrypt('sensitive data');
const decrypted = decrypt(encrypted);
```

## Security Best Practices

1. **Key Management**
   - Store the encryption key in environment variables
   - Use different keys for development, staging, and production
   - Rotate keys periodically (requires data re-encryption)
   - Never log or expose the encryption key

2. **Backup Strategy**
   - Backup your encryption key separately from the database
   - Document key recovery procedures
   - Test backup restoration regularly

3. **Access Control**
   - Limit access to the encryption key
   - Use proper authentication and authorization
   - Audit access to sensitive data

4. **Monitoring**
   - Monitor for encryption/decryption errors
   - Log failed decryption attempts
   - Alert on suspicious access patterns

## Troubleshooting

### "ENCRYPTION_KEY not set" Error
Ensure your `.env` file contains the `ENCRYPTION_KEY` variable and is properly loaded.

### Decryption Failures
- Verify the encryption key hasn't changed
- Check that the encrypted data wasn't corrupted
- Ensure the data format is correct (base64-encoded)

### Migration Issues
- Ensure database connectivity before running migration
- Backup your database before migrating
- Run migration during low-traffic periods

## Performance Considerations

- Encryption/decryption adds minimal overhead (~1-5ms per operation)
- Searching encrypted fields requires decryption (not indexed)
- Consider caching decrypted data for frequently accessed records
- Database indexes work on encrypted data but won't be meaningful for searches

## Data Recovery

If you need to recover data:

1. **With the encryption key**: Data can be fully recovered
2. **Without the encryption key**: Data is permanently lost (by design)

Always maintain secure backups of your encryption key!

## Compliance

This implementation helps meet compliance requirements for:
- GDPR (data protection)
- FERPA (student privacy)
- Local data protection regulations

Consult with legal counsel to ensure full compliance with applicable regulations.
