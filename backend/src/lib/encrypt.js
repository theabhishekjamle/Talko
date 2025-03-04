import CryptoJS from 'crypto-js';

// Your secret key (MUST be 32 characters for AES-256)
const SECRET_KEY = CryptoJS.enc.Utf8.parse("12345678901234567890123456789012"); 
const IV = CryptoJS.enc.Utf8.parse("1234567890123456"); // 16 bytes IV

// Encrypt a message
export function encryptMessage(message) {
    const encrypted = CryptoJS.AES.encrypt(message, SECRET_KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

// Decrypt a message
export function decryptMessage(encryptedMessage) {
    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, SECRET_KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
