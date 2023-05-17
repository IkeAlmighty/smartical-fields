import { NextResponse } from "next/server";
import { Configuration } from "openai";
import { OpenAIApi } from "openai";

// Initialize OpenAI
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(request) {
  try {
    const body = await request.json();

    // Make the API call to OpenAI
    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Respond in one word. Categorize '${body.input}' as either email, name, phone, location, Google map link, letter, or notes.`,
      max_tokens: 10,
    });

    // Extract the category from the result
    const category = result.data.choices[0].text.trim();

    return NextResponse.json({ category });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
