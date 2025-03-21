import { NextResponse } from 'next/server';
import { MENTAL_HEALTH_SYSTEM_PROMPT, Message } from '@/lib/chat-config';
import { headers } from 'next/headers';

// Set the runtime to edge for best performance
export const runtime = "edge"

// Get environment variables
const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;

// Debug log for environment variables
console.log('Environment check:', {
  hasGoogleKey: !!GOOGLE_AI_API_KEY,
  nodeEnv: process.env.NODE_ENV,
  envKeys: Object.keys(process.env)
});

export async function POST(req: Request) {
  try {
    // Check authentication
    const authHeader = headers().get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { message } = await req.json();

    try {
      // Check if API key is available
      if (!GOOGLE_AI_API_KEY) {
        console.error('Gemini API key is missing. Available env vars:', Object.keys(process.env));
        throw new Error('Missing GOOGLE_AI_API_KEY');
      }

      // Log the request configuration (without the full API key)
      console.log('Making request to Gemini API:', {
        hasApiKey: !!GOOGLE_AI_API_KEY,
        apiKeyPrefix: GOOGLE_AI_API_KEY?.substring(0, 10) + '...'
      });

      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': GOOGLE_AI_API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: MENTAL_HEALTH_SYSTEM_PROMPT }]
              },
              {
                role: 'model',
                parts: [{ text: 'I understand. I will follow these guidelines and provide supportive, brief responses.' }]
              },
              {
                role: 'user',
                parts: [{ text: message }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 150,
              topP: 0.8,
              topK: 40
            },
            safetySettings: [
              {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
              },
              {
                category: 'HARM_CATEGORY_HATE_SPEECH',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
              },
              {
                category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
              },
              {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
              }
            ]
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Gemini API error:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        throw new Error(`API request failed: ${response.statusText}${errorData ? ` - ${JSON.stringify(errorData)}` : ''}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      return NextResponse.json({ message: aiResponse });
    } catch (error: any) {
      console.error('Error in chat route:', error);
      
      // If API key is missing, return a specific error
      if (error.message.includes('Missing GOOGLE_AI_API_KEY')) {
        return NextResponse.json(
          { 
            error: 'Configuration error',
            details: 'API key not configured. Please check server configuration.' 
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { 
          error: 'Failed to get AI response',
          details: error.message 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error parsing request:', error);
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}

