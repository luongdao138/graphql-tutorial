"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptCursor = exports.encryptCursor = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const algorithm = "aes-256-cbc";
const key = Buffer.alloc(32, 0);
const iv = Buffer.alloc(16, 0);
function encryptCursor(cursor) {
    const cipher = node_crypto_1.default.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(cursor, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}
exports.encryptCursor = encryptCursor;
function decryptCursor(encryptedcursor) {
    const deCipher = node_crypto_1.default.createDecipheriv(algorithm, key, iv);
    let decrypted = deCipher.update(encryptedcursor, "hex", "utf8");
    decrypted += deCipher.final("utf-8");
    return decrypted;
}
exports.decryptCursor = decryptCursor;
//# sourceMappingURL=pagination-cursor.js.map