import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.post('/api/assistant', async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const client = getAIClient();
      if (!client) {
        return res.json({
          reply:
            'Welcome to the Huzefa Electronics showroom concierge. I am here to help you select reference gaming laptops, calibrated 8K OLED TVs, spatial audio earbuds, and titanium flagships. How can I guide your setup today?',
        });
      }

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'You are the Senior Technical Concierge for "Huzefa Electronics", an ultra-premium, modern-classic 3D electronics showroom inspired by the unified aesthetic of Apple (unibody titanium/aluminum craftsmanship), Samsung (leading display panel mastery & 8K OLED), and Sony (reference-grade studio acoustics & optical lenses). Speak with refined expertise, authoritative technical depth (referencing ray tracing, vapor chambers, Calman delta-E, LDAC lossless 24-bit audio, and titanium grade-5 chassis), and warm, professional composure. Mention our 3-Year Platinum White-Glove Care and custom calibration. Keep answers informative, focused, and under 120 words.',
        },
      });

      res.json({ reply: response.text });
    } catch (err: any) {
      console.error('Gemini Assistant Error:', err);
      res.json({
        reply:
          'Our Huzefa Electronics showroom inventory spans reference 18" RTX 4090 gaming notebooks, 8K OLED evo master displays, balanced-armature hybrid ANC earbuds, and 200MP periscope titanium smartphones. All backed by 3-Year Platinum Care and White-Glove delivery.',
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Huzefa Electronics Showroom running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
