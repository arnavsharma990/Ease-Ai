import { NextResponse } from 'next/server';
import { MENTAL_HEALTH_SYSTEM_PROMPT, Message } from '@/lib/chat-config';
import { headers } from 'next/headers';

// Set the runtime to edge for best performance
export const runtime = "edge"

// Get environment variables
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'SukoonAI';

// Mock response function for when OpenAI is not available
function getMockResponse(prompt: string) {
  const responses = [
    "I understand how you're feeling. Would you like to talk more about it?",
    "That sounds challenging. Have you tried any of the breathing exercises in our app?",
    "I'm here to support you. The mood tracker might help you notice patterns in how you're feeling.",
    "It's important to acknowledge your feelings. Would journaling about this help?",
    "Self-care is essential. What's one small thing you could do for yourself today?",
    "I appreciate you sharing that with me. How long have you been feeling this way?",
    "That's a common experience. Many people go through similar situations.",
    "Have you considered trying meditation? Our breathing exercises section has some guided options.",
    "Your feelings are valid. Would it help to explore some coping strategies together?",
    "I'm here to listen whenever you need to talk.",
  ]

  // Simple keyword matching for slightly more relevant responses
  if (prompt.toLowerCase().includes("sad") || prompt.toLowerCase().includes("depress")) {
    return "I'm sorry to hear you're feeling down. Remember that it's okay to not be okay sometimes. Would you like to explore some mood-lifting activities?"
  }
  if (
    prompt.toLowerCase().includes("anxious") ||
    prompt.toLowerCase().includes("worry") ||
    prompt.toLowerCase().includes("stress")
  ) {
    return "Anxiety can be really challenging. Have you tried the 4-7-8 breathing technique in our breathing exercises section? It can help calm your nervous system."
  }
  if (prompt.toLowerCase().includes("sleep") || prompt.toLowerCase().includes("tired")) {
    return "Sleep is so important for mental wellbeing. Our resources section has some tips for better sleep hygiene that might help."
  }

  // Default to random response
  return responses[Math.floor(Math.random() * responses.length)]
}

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

    // Create conversation array with system prompt and user message
    const messages: Message[] = [
      { role: 'system', content: MENTAL_HEALTH_SYSTEM_PROMPT },
      { role: 'user', content: message }
    ];

    try {
      // Check if API key is available
      if (!OPENROUTER_API_KEY) {
        console.error('OpenRouter API key is missing');
        throw new Error('Missing OPENROUTER_API_KEY');
      }

      // Log the request configuration (without the full API key)
      console.log('Making request to OpenRouter with config:', {
        url: 'https://openrouter.ai/api/v1/chat/completions',
        hasApiKey: !!OPENROUTER_API_KEY,
        apiKeyPrefix: OPENROUTER_API_KEY?.substring(0, 10) + '...',
        siteUrl: SITE_URL,
        siteName: SITE_NAME
      });

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': SITE_URL,
          'X-Title': SITE_NAME
        },
        body: JSON.stringify({
          model: 'openai/gpt-4',
          messages: messages,
          temperature: 0.7,
          max_tokens: 150, // Reduced for shorter responses
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('OpenRouter API error:', {
          status: response.status,
          statusText: response.statusText,
          errorData
        });
        throw new Error(`API request failed: ${response.statusText}${errorData ? ` - ${JSON.stringify(errorData)}` : ''}`);
      }

      const data = await response.json();
      return NextResponse.json({ message: data.choices[0].message.content });
    } catch (error: any) {
      console.error('Error in chat route:', error);
      
      // If API key is missing, return a specific error
      if (error.message.includes('Missing OPENROUTER_API_KEY')) {
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

