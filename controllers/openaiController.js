import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatbotController = async (req, res) => {
  try {
    const { text } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Answer questions like Yoda from Star Wars." },
        { role: "user", content: text }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    // Correct way to access response content
    if (response?.choices?.[0]?.message?.content) {
      return res.status(200).json({ response: response.choices[0].message.content });
    } else {
      return res.status(500).json({ error: "No response received from OpenAI API." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
