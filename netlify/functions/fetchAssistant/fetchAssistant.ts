import { openai } from "@/config/openAiConfig"
import { Handler } from "@netlify/functions"

type RequestBody = {
	asstId: string
	threadId: string
	userInput: string
}

const handler: Handler = async (e) => {
	const { asstId, threadId, userInput }: RequestBody = JSON.parse(e.body!)

	/* -- Assistants API Functions -- */
	// Create a message
	const createMessage = async (input: string) => {
		await openai.beta.threads.messages.create(threadId, {
			role: "user",
			content: input
		})
	}

	// Run the assistant's thread
	const runThread = async () => {
		const run = await openai.beta.threads.runs.create(threadId, {
			assistant_id: asstId,
			model: "gpt-4-1106-preview",
			instructions: `You are great at recommending campervans. When asked a question or for a recommendation, use the information in the provided file to form a friendly response. If you cannot find the answer in the file, do not make up an answer. Just reply with "Sorry, I do not know." and direct the questioner to email help@vanlife.com. Never provide annotations like these (【14†source】) in your reply. Keep your answers very short`,
			tools: [{ type: "retrieval" }]
		})
		return run
	}

	// List thread messages
	const listMessages = async () => {
		return await openai.beta.threads.messages.list(threadId)
	}

	// Get the current run
	const retrieveRun = async (thread: string, run: string) => {
		return await openai.beta.threads.runs.retrieve(thread, run)
	}

	try {
		// Create a message
		await createMessage(userInput)

		// Create a run
		const run = await runThread()

		// Retrieve the current run
		let currentRun = await retrieveRun(threadId, run.id)

		// Keep Run status up to date
		// Poll for updates and check if run status is completed
		while (currentRun.status !== "completed") {
			await new Promise((resolve) => setTimeout(resolve, 1500))
			console.log(currentRun.status)
			currentRun = await retrieveRun(threadId, run.id)
		}

		// Get messages from the thread
		const { data } = await listMessages()
		return {
			statusCode: 200,
			body: JSON.stringify({
				reply: data
			})
		}
	} catch (error) {
		return { statusCode: 500, body: (error as string).toString() }
	}
}

export { openai, handler }
