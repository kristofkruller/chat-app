import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { openai } from "..";

dotenv.config();

export const router = express.Router();

app.get("/chat", (req, res) => {
  res.status(200).send({ message: "Hello World" });
});

app.post("/", async(req, res) => { 
  try {
    const { text, activeChatId } = req.body; // active

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are an assistant coder, who responds with code and explanations by comments" 
        }, // this represents the bot and what role they will assume
        { role: "user", content: text }, // the message that the user sends

        // if you wanted to keep the "threads" that exist on ChatGPT, you would have to save the
        // messages that the bot sends and then provide them to the bot in the next request.
      ],
    });

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].message.content },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,        
        },
      }
    );

    res.status(200).json({ text: response.data.choices[0].message.content });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;