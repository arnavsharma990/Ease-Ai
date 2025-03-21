# SukoonAI - Mental Wellness Assistant

SukoonAI is a mental wellness platform that provides AI-powered support, breathing exercises, mood tracking, and journaling features to help users maintain their mental well-being.

## Features

- 🤖 AI Chat Support with Google's Gemini
- 🫁 Guided Breathing Exercises
- 📊 Mood Tracking
- 📝 Journaling
- 👥 Community Support
- 🏥 Professional Consultation

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Google Gemini AI
- NextAuth.js
- Shadcn/ui

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sukoon_ai_assistant.git
cd sukoon_ai_assistant
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env.local`
- Fill in the required API keys and secrets

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

The following environment variables are required:

- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `GOOGLE_AI_API_KEY`: Google Gemini AI API key
- `NEXTAUTH_URL`: Your application URL
- `NEXTAUTH_SECRET`: Random string for session encryption

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Google Gemini AI](https://ai.google.dev/)
- [NextAuth.js](https://next-auth.js.org/)
- [Shadcn/ui](https://ui.shadcn.com/) 