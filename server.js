require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

// API Endpoint for Architect Agent
app.post('/api/architect', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are the Architect Agent for TPL, an AI-powered Club Management System. Your goal is to help student clubs plan events. Provide a concise response with: 1. Suggested Date, 2. Suggested Budget, 3. Suggested Location, and 4. A brief planning tip."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 150,
        });

        const aiResponse = response.choices[0].message.content;
        res.json({ response: aiResponse });

    } catch (error) {
        console.error('OpenAI Error:', error);
        res.status(500).json({ error: 'Failed to get response from AI' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
