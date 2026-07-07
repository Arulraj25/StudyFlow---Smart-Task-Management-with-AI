// gemini.js - Handles communication with Google's Gemini API
const axios = require("axios");

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

/**
 * Sends a task description to Gemini and asks it to break it down
 * into 3-5 subtasks, each with a suggested deadline.
 * @param {string} taskDescription - what the student needs to get done
 * @param {string} dueDate - ISO date string of the overall task's due date
 */
async function generateSubtasks(taskDescription, dueDate) {
  // We instruct Gemini very explicitly to return ONLY valid JSON,
  // because we need to parse its response programmatically.
  const prompt = `
You are a study planning assistant. A student has this task:
"${taskDescription}"
The overall due date is: ${dueDate}

Break this task down into 3 to 5 concrete subtasks that lead up to the due date.
For each subtask, suggest a realistic deadline (a date on or before ${dueDate}).

Respond with ONLY valid JSON (no markdown, no explanation, no code fences).
Use exactly this format:
[
  { "title": "Subtask description", "deadline": "YYYY-MM-DD" },
  { "title": "Subtask description", "deadline": "YYYY-MM-DD" }
]
`;

  try {
    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    // Gemini's response text lives at this nested path
    const rawText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Sometimes models wrap JSON in ```json fences despite instructions -
    // strip those out just in case before parsing.
    const cleaned = rawText.replace(/```json|```/g, "").trim();

    const subtasks = JSON.parse(cleaned);

    // Basic validation - make sure we got an array of objects with a title
    if (!Array.isArray(subtasks)) throw new Error("Gemini did not return an array");

    return subtasks;
  } catch (error) {
    console.error("Gemini API error:", error.message);
    throw new Error("Failed to generate subtasks from Gemini");
  }
}

module.exports = { generateSubtasks };
