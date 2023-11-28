import OpenAI from "openai"

export const openai = new OpenAI({
	apiKey: "randomKey",
	dangerouslyAllowBrowser: true
})
