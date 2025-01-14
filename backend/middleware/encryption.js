import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const encryptionKey = process.env.ENCRYPTION_KEY || "abcdefghijklmnopqrstuvwxyz123456"; // Use a secure key
const ivLength = parseInt(process.env.IV_LENGTH, 10); // Read IV length

// Function to generate a random IV based on length from .env file
const generateIV = () => crypto.randomBytes(ivLength).toString("hex");

// Middleware to encrypt a message
export const encryptMessage = (message) => {
  const iv = generateIV();
  
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(encryptionKey), Buffer.from(iv, "hex"));
  let encrypted = cipher.update(message, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv}:${encrypted}`;
};

// Method to decrypt a message
export const decryptMessage = (encryptedMessage) => {
try {  // Split the encrypted message into IV and encrypted content
  const splitIndex = encryptedMessage.indexOf(":");
  if (splitIndex === -1) {
    throw new Error("Invalid encrypted message format.");
  }
  const iv = encryptedMessage.slice(0, splitIndex);
  const encryptedContent = encryptedMessage.slice(splitIndex + 1);

  //Log the IV and encrypted content to help with debugging
//   console.log("IV:", iv);
//   console.log("Encrypted Content:", encryptedContent);
  
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(encryptionKey), Buffer.from(iv, "hex"));
  let decrypted = decipher.update(encryptedContent, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;}
  catch (error) {
    console.error("Error decrypting message:", error.message);
    // throw error;
}
};
