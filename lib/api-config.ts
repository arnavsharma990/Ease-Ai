// API Configuration
export const API_CONFIG = {
  GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY || "AIzaSyA38elxZFKPzTs6tFxVa1tHytMf0Zu6D-Y",
  MODEL_NAME: "gemini-2.0-flash-thinking-exp-01-21"
} as const;

// Validate environment variables
export function validateConfig() {
  if (!API_CONFIG.GOOGLE_AI_API_KEY) {
    throw new Error('Missing required API key: GOOGLE_AI_API_KEY');
  }
} 