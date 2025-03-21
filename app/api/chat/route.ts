import { NextResponse } from 'next/server';
import { MENTAL_HEALTH_SYSTEM_PROMPT } from '@/lib/chat-config';
import { API_CONFIG, validateConfig } from '@/lib/api-config';
import { headers } from 'next/headers';

// Set the runtime to edge for best performance
export const runtime = "edge"

export async function POST(req: Request) {
  try {
    // Validate environment variables
    validateConfig();

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
      console.log('Making request to Gemini API:', {
        hasApiKey: !!API_CONFIG.GOOGLE_AI_API_KEY,
        url: API_CONFIG.GEMINI_API_URL
      });

      const response = await fetch(API_CONFIG.GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': API_CONFIG.GOOGLE_AI_API_KEY!,
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
      });

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

