import { Handler } from "@netlify/functions"
import { openai } from "@/config/openAiConfig"

const handler: Handler = async () => {
	try {
		// Create #VANLIFE Assistant for each user
		const createAssistant = async () => {
			const myAssistant = await openai.beta.assistants.create({
				instructions: `You are great at recommending campervans. When asked a question or for a recommendation, use the information in the provided file to form a friendly response. If you cannot find the answer in the file, do not make up an answer. Just reply with "Sorry, I do not know." and direct the questioner to email help@vanlife.com. Never provide annotations like these (【14†source】) in your reply. Keep your answers very short`,
				name: "#VANLIFE assistant",
				tools: [{ type: "retrieval" }],
				model: "gpt-4-1106-preview",
				file_ids: ["file-Bsm95hQxzHhLX5zvA5NV8wZj"]
			})

			return myAssistant.id
		}

		// Generate threadId for each user
		const threadFunc = async () => {
			const thread = await openai.beta.threads.create()
			return thread.id
		}

		const assistantId = await createAssistant()
		const threadId = await threadFunc()

		return {
			statusCode: 200,
			body: JSON.stringify({
				ids: { assistantId, threadId }
			})
		}
	} catch (error) {
		return { statusCode: 500, body: (error as string).toString() }
	}
}

export { handler }
