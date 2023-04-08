import crypto from "node:crypto";

// Defining algorithm
const algorithm = "aes-256-cbc";

// Defining key
const key = Buffer.alloc(32, 0);

// Defining iv
const iv = Buffer.alloc(16, 0);

export function encryptCursor(cursor: string) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(cursor, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decryptCursor(encryptedcursor: string) {
  const deCipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = deCipher.update(encryptedcursor, "hex", "utf8");
  decrypted += deCipher.final("utf-8");
  return decrypted;
}
