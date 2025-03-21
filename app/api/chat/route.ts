import { NextResponse } from 'next/server';
import { MENTAL_HEALTH_SYSTEM_PROMPT } from '@/lib/chat-config';
import { API_CONFIG, validateConfig } from '@/lib/api-config';
import { headers } from 'next/headers';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Set the runtime to edge for best performance
export const runtime = "edge"

export async function POST(req: Request) {
  try {
    // Validate environment variables
    validateConfig();

    // Check authentication
    const headersList = await headers();
    const authHeader = headersList.get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { message } = await req.json();

    try {
      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(API_CONFIG.GOOGLE_AI_API_KEY);
      const model = genAI.getGenerativeModel({ model: API_CONFIG.MODEL_NAME });

      // Prepare the chat prompt
      const prompt = `${MENTAL_HEALTH_SYSTEM_PROMPT}\n\nUser: ${message}`;

      // Generate response
      const result = await model.generateContent(prompt);
      const response = result.response.text();

      return NextResponse.json({ message: response });
    } catch (error: any) {
      console.error('Error in chat route:', error);
      
      return NextResponse.json(
        { 
          error: 'Failed to get AI response',
          details: error.message 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { 
        error: 'Configuration error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

