import { GoogleGenerativeAI } from "@google/generative-ai";

// Debug: Log API key status
const apiKey = process.env.GEMINI_API_KEY?.trim();
console.log(
  `[Gemini Service] API Key loaded: ${apiKey ? "✅ Yes (" + apiKey.substring(0, 10) + "...)" : "❌ No"}`,
);

if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set or is empty");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
console.log("[Gemini Service] Model initialized: ✅ gemini-2.0-flash");

const buildPrompt = (role, resumeText) =>
  `
You are an expert technical recruiter and career coach.

Evaluate the following resume against the target role and return a detailed, honest assessment.

TARGET ROLE: ${role}

RESUME TEXT:
${resumeText}

SCORING RULES:
- 90-100 = Excellent match (role-ready)
- 75-89  = Strong match (minor gaps)
- 60-74  = Moderate match (notable gaps)
- 40-59  = Weak match (significant gaps)
- Below 40 = Poor match (major realignment needed)

Return ONLY valid JSON — no markdown, no code fences, no extra text — exactly this structure:
{
  "role": "${role}",
  "compatibility_score": <integer 0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "skills_detected": ["<skill1>", "<skill2>"],
  "missing_skills": ["<skill1>", "<skill2>"],
  "resume_strengths": ["<strength1>", "<strength2>"],
  "improvement_suggestions": ["<actionable suggestion 1>", "<actionable suggestion 2>"],
  "career_guidance": "<paragraph of specific career advice for this role>"
}
`.trim();

/**
 * Analyze resume text against a role using Gemini.
 * @param {string} role
 * @param {string} resumeText
 * @returns {Promise<object>}
 */
export const analyzeWithGemini = async (role, resumeText) => {
  try {
    const prompt = buildPrompt(role, resumeText);

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    // Safely extract JSON even if Gemini adds extra text or markdown
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("[Gemini] Raw response:", rawText);
      throw new Error("AI response could not be parsed");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("[Gemini Error Details]:", {
      message: error.message,
      code: error.code,
      status: error.status,
      fullError: error.toString(),
    });
    throw error;
  }
};
