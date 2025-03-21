// API Configuration
export const API_CONFIG = {
  GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'
} as const;

// Validate environment variables
export function validateConfig() {
  const requiredEnvVars = ['GOOGLE_AI_API_KEY'];
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}`
    );
  }
} 