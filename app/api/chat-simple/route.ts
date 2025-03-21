// Simple API route that doesn't use streaming
export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    // Predefined responses based on keywords
    let response = "I'm here to support you. How can I help you today?"

    // Simple keyword matching for more relevant responses
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("sad") || lowerMessage.includes("depress")) {
      response =
        "I'm sorry to hear you're feeling down. It's important to acknowledge these feelings. Would you like to try tracking your mood in our mood tracker? It might help you notice patterns over time. Remember that it's okay to not be okay sometimes, and reaching out for support is a sign of strength."
    } else if (lowerMessage.includes("anxious") || lowerMessage.includes("worry") || lowerMessage.includes("stress")) {
      response =
        "Anxiety can be really challenging. Have you tried the 4-7-8 breathing technique in our breathing exercises section? It can help calm your nervous system. Also, writing down your worries in the journal section might help you process them better. Remember that you're not alone in feeling this way."
    } else if (lowerMessage.includes("sleep") || lowerMessage.includes("tired")) {
      response =
        "Sleep is so important for mental wellbeing. Our resources section has some tips for better sleep hygiene that might help. Creating a consistent bedtime routine and limiting screen time before bed can make a big difference. Would you like to explore some relaxation techniques that could help you wind down?"
    } else if (lowerMessage.includes("happy") || lowerMessage.includes("good") || lowerMessage.includes("great")) {
      response =
        "I'm glad to hear you're feeling good! It's wonderful that you're experiencing positive emotions. Would you like to record this in your mood tracker to help you remember this feeling? Celebrating these moments, no matter how small, can be really beneficial for your overall wellbeing."
    } else if (lowerMessage.includes("angry") || lowerMessage.includes("frustrat") || lowerMessage.includes("upset")) {
      response =
        "It sounds like you're feeling frustrated. That's completely understandable. Sometimes taking a moment to practice deep breathing can help manage these intense emotions. Our breathing exercises section has some techniques you might find helpful. Would you like to talk more about what's causing these feelings?"
    } else if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
      response =
        "I'm here to support you. SukoonAI offers several features that might help: you can track your mood, practice breathing exercises, journal your thoughts, or explore our resources section. What would be most helpful for you right now?"
    } else if (lowerMessage.includes("thank")) {
      response =
        "You're very welcome. I'm glad I could be of help. Remember that I'm here whenever you need someone to talk to. Is there anything else you'd like to discuss or explore today?"
    }

    // Add a small delay to simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return new Response(JSON.stringify({ response }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        response: "I'm sorry, I'm having trouble understanding. Could you try rephrasing your message?",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

