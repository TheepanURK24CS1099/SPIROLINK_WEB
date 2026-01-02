import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
  credentials: true,
}));
app.use(express.json());

// Initialize OpenAI client (API key from .env)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "✅ Chatbot backend is running" });
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message, context } = req.body;

    // Validation
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ OPENAI_API_KEY not set in .env");
      return res.status(500).json({ error: "API key not configured" });
    }

    // Create system message for context
    const systemMessage = context || `You are a helpful website chatbot for SPIROLINK, a company specializing in broadband network infrastructure, including PON, FTTH, microwave networks, optical long-haul, and WiFi solutions. 

Help users with questions about our services, technology, and solutions. Be professional, knowledgeable, and helpful. Keep responses concise and clear.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: systemMessage 
        },
        { 
          role: "user", 
          content: message 
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;

    res.json({
      success: true,
      reply: reply,
      model: "gpt-4o-mini",
    });

  } catch (error) {
    console.error("❌ Chatbot error:", error.message);
    
    if (error.status === 401) {
      res.status(401).json({ 
        error: "API key invalid. Please check your OpenAI API key in .env" 
      });
    } else if (error.status === 429) {
      res.status(429).json({ 
        error: "Rate limit exceeded. Please try again later." 
      });
    } else {
      res.status(500).json({ 
        error: "Chatbot error: " + error.message 
      });
    }
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Chatbot backend running on http://localhost:${PORT}`);
  console.log(`📝 POST /chat - Send messages to ChatGPT`);
  console.log(`🏥 GET /health - Health check`);
});
