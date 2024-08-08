import crypto from 'crypto';
import dotenv from "dotenv"

dotenv.config({path: "../.env"})

// Encryption key should be 32 bytes (256 bits)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16; // For AES, this is always 16 bytes (128 bits)

export function encryptApiKey(apiKey: any) {
  if (!ENCRYPTION_KEY) {
    throw new Error('Encryption key is not set');
  }

  // Create a unique initialization vector for each encryption
  const iv = crypto.randomBytes(IV_LENGTH);

  // Create cipher
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);

  // Encrypt the API key
  let encrypted = cipher.update(apiKey, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Prepend the IV to the encrypted data (we'll need it for decryption)
  return iv.toString('hex') + ':' + encrypted;
}

export function decryptApiKey(encryptedApiKey: any) {
  if (!ENCRYPTION_KEY) {
    throw new Error('Encryption key is not set');
  }

  // Split the IV and encrypted data
  const textParts = encryptedApiKey.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');

  // Create decipher
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);

  // Decrypt the API key
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}