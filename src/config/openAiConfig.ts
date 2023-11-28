import OpenAI from "openai"

export const openai = new OpenAI({
	apiKey: process.env.VITE_OPENAI_API_KEY
})
