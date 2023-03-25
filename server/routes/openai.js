import { openai } from "..";

const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Hello world",
});
