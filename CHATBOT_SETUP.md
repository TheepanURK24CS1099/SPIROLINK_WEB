# 🤖 ChatGPT Chatbot Setup Guide

## 🚨 SECURITY ALERT - API Key Exposed!

Your old API key is **COMPROMISED**. You must:

1. ✅ Go to: https://platform.openai.com/account/api-keys
2. ✅ **DELETE** the exposed key (sk-proj-jAknzLrzUrncxE4DrL6Xty...)
3. ✅ **CREATE** a new API key
4. ✅ Copy the **NEW** key

---

## 🏗️ Architecture Overview

```
Frontend (React Component)
    ↓ HTTPS/FETCH
Backend (Node.js/Express)
    ↓ API KEY (SECURE)
OpenAI API (ChatGPT)
```

**🔐 Your API key stays ONLY in the backend `.env` file - NEVER exposed to frontend!**

---

## 📋 Setup Instructions

### Step 1: Backend Setup

```bash
# Navigate to backend folder
cd chatbot-backend

# Install dependencies
npm install

# The .env file is already created for you
# Edit it with your NEW API key:
```

### Step 2: Configure API Key

Open `chatbot-backend/.env`:

```env
OPENAI_API_KEY=sk-proj-YOUR-NEW-KEY-HERE
PORT=5000
NODE_ENV=development
```

**Replace `sk-proj-YOUR-NEW-KEY-HERE` with your actual new OpenAI API key**

### Step 3: Start Backend

From `chatbot-backend` folder:

```bash
npm start
# or for development with auto-reload:
npm run dev
```

You should see:
```
✅ Chatbot backend running on http://localhost:5000
📝 POST /chat - Send messages to ChatGPT
🏥 GET /health - Health check
```

### Step 4: Start Frontend

From project root (in another terminal):

```bash
npm run dev
```

Your website should load at `http://localhost:5174` (or similar)

### Step 5: Test the Chatbot

1. Open your website
2. Click the green **"Chat"** button in bottom-right corner
3. Type a message like: "Tell me about PON technology"
4. ChatGPT should respond!

---

## 🎯 How It Works

### Frontend (React Component)
- Located: `src/components/Chatbot.tsx`
- Shows floating chat button
- Sends user message to backend via HTTP POST
- Displays bot responses

### Backend (Node.js)
- Located: `chatbot-backend/server.js`
- Receives message from frontend
- Calls OpenAI API with your secret key
- Returns response to frontend
- **API key never exposed to frontend!**

### Message Flow

```
User types "Hello" in chat
    ↓
Frontend sends to http://localhost:5000/chat
    ↓
Backend receives message
    ↓
Backend calls: openai.chat.completions.create()
    ↓
OpenAI returns response
    ↓
Backend sends reply to frontend
    ↓
Frontend displays reply in chat
```

---

## 🧪 Testing

### Health Check
```bash
curl http://localhost:5000/health
# Response: {"status":"✅ Chatbot backend is running"}
```

### Send a Message
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello, how are you?"}'
```

---

## 🔧 File Structure

```
project/
├── src/
│   └── components/
│       └── Chatbot.tsx         ← React chatbot component
├── chatbot-backend/
│   ├── server.js               ← Express backend
│   ├── package.json            ← Dependencies
│   ├── .env                    ← API Key (SECURE!)
│   └── .gitignore              ← Prevents committing .env
└── App.tsx                     ← Chatbot imported here
```

---

## 🚀 Running Everything

### Terminal 1 (Backend):
```bash
cd chatbot-backend
npm start
```

### Terminal 2 (Frontend):
```bash
npm run dev
```

Visit: http://localhost:5174

---

## ✅ Features Implemented

✅ **Floating chat widget** - Bottom-right corner  
✅ **Message bubbles** - User (green) vs Bot (gray)  
✅ **Auto-scroll** - Latest messages visible  
✅ **Loading indicator** - Shows "Thinking..."  
✅ **Error handling** - Shows error messages  
✅ **Keyboard support** - Press Enter to send  
✅ **Responsive design** - Works on mobile  
✅ **SPIROLINK context** - Bot knows about your services  

---

## 🐛 Troubleshooting

### Issue: "Error: API key not configured"
**Fix:** Check `.env` file has your API key

### Issue: "Backend connection failed"
**Fix:** Make sure backend is running on port 5000:
```bash
cd chatbot-backend
npm start
```

### Issue: "Invalid API key"
**Fix:** Your API key might be wrong or expired:
1. Go to https://platform.openai.com/account/api-keys
2. Delete and create a new key
3. Update `.env` file
4. Restart backend

### Issue: CORS error
**Fix:** Backend already configured with CORS. Check both are running on localhost.

---

## 🔐 Security Best Practices

✅ **API key in `.env`** - Backend only  
✅ **`.env` in `.gitignore`** - Never committed  
✅ **CORS limited** - Only localhost  
✅ **Error messages** - Don't expose API key  
✅ **No key in frontend** - Frontend never sees key  

---

## 📚 API Endpoints

### GET /health
Health check endpoint
```bash
curl http://localhost:5000/health
```
Response:
```json
{"status":"✅ Chatbot backend is running"}
```

### POST /chat
Send message to ChatGPT
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d {
    "message": "What is PON?",
    "context": "You are a helpful chatbot for SPIROLINK"
  }
```
Response:
```json
{
  "success": true,
  "reply": "PON (Passive Optical Network) is...",
  "model": "gpt-4o-mini"
}
```

---

## 🎯 Next Steps (Optional)

- [ ] Deploy backend to Render.com or Railway.app
- [ ] Add conversation history (remember past messages)
- [ ] Add Tamil language support
- [ ] Add more system context from your website
- [ ] Add typing indicators
- [ ] Add message timestamps
- [ ] Add export chat to PDF
- [ ] Add WhatsApp integration

---

## 📞 Support

If issues occur:

1. Check console for error messages (F12)
2. Verify backend is running
3. Check `.env` file has correct API key
4. Verify API key is not rate-limited
5. Check network tab in DevTools

---

**Your chatbot is now ready! 🎉**

Questions about SPIROLINK services? Ask the chatbot!
