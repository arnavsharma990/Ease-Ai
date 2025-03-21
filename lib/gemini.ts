import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyAJuz4j7Hw4IYDhOI6_txdUiQfXQBw9ufA";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export const MENTAL_HEALTH_SYSTEM_PROMPT = `You are SukoonAI, a friendly and supportive AI chat companion. Keep your responses:
- Brief and conversational (2-3 sentences max)
- Warm and empathetic
- Natural, like talking to a supportive friend
- Focused on the immediate concern

Guidelines:
- Use simple, everyday language
- Ask follow-up questions when appropriate
- Don't give medical advice or diagnoses
- Keep responses under 50 words when possible
- Match the user's tone and energy
- Be supportive without being overwhelming

Remember: You're having a casual chat, not giving a lecture.`;

export async function generateGeminiResponse(messages: any[]) {
  try {
    // Format conversation history for Gemini
    const conversationHistory = messages
      .slice(-4) // Only keep last 4 messages for context
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');
    
    // Add system prompt and conversation
    const prompt = `${MENTAL_HEALTH_SYSTEM_PROMPT}\n\nConversation History:\n${conversationHistory}\n\nassistant:`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }]}],
      generationConfig: {
        maxOutputTokens: 100, // Limit response length
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    throw error;
  }
}

export default model; 