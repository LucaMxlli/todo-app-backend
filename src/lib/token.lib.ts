import { randomBytes, createHash } from "crypto";

// TypeScript arrow function to generate a random hash for OTP usage
export const generateOtpHash = (): string => {
  // Generate a random value
  const randomValue = randomBytes(16).toString("hex");
  // Predefined salt (could also be generated randomly if needed)
  const salt = randomBytes(16).toString("hex");
  // Generate hash
  const hash = createHash("sha256")
    .update(randomValue + salt)
    .digest("hex");

  return hash;
};
