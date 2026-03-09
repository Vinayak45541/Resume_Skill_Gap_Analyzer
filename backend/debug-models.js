import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY?.trim();
if (!apiKey) {
  console.error("❌ No API key found in .env");
  process.exit(1);
}

console.log(`[Debug] API Key: ${apiKey.substring(0, 10)}...`);
console.log("[Debug] Testing available models...\n");

const genAI = new GoogleGenerativeAI(apiKey);

// Models to test (ordered by preference)
const modelsToTest = [
  "gemini-2.0-flash",
  "gemini-2.0-pro",
  "gemini-1.5-pro",
  "gemini-1.5-flash",
  "gemini-pro",
  "gemini-pro-vision",
];

console.log("Testing models:\n");

(async () => {
  for (const modelName of modelsToTest) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const response = await model.generateContent("Test");
      console.log(`✅ ${modelName} - WORKS`);
      break; // Stop at first working model
    } catch (error) {
      const errorMsg = error.message || error.toString();
      if (errorMsg.includes("404") || errorMsg.includes("not found")) {
        console.log(`❌ ${modelName} - Not available`);
      } else if (
        errorMsg.includes("401") ||
        errorMsg.includes("Unauthorized")
      ) {
        console.log(`⚠️  ${modelName} - Unauthorized (API key issue)`);
      } else {
        console.log(`⚠️  ${modelName} - Error: ${errorMsg.split("\n")[0]}`);
      }
    }
  }

  console.log("\n✅ Use the first working model in geminiService.js");
})();
