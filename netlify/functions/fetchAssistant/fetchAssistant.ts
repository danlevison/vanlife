import OpenAI from "openai"
import { Handler } from "@netlify/functions"

const openai = new OpenAI({
	apiKey: process.env.VITE_OPENAI_API_KEY
})

const assistantID = "asst_619dFmW3XVqF7ZGxZ7p4wE3m"
const threadID = "thread_htFn6hZERUUOEHYpNTKOYQc9"

// Create a message
const createMessage = async (input: string) => {
	await openai.beta.threads.messages.create(threadID, {
		role: "user",
		content: input
	})
}

// Run the assistant's thread
const runThread = async () => {
	const run = await openai.beta.threads.runs.create(threadID, {
		assistant_id: assistantID,
		model: "gpt-3.5-turbo-1106",
		instructions: `Only reply about campervans in the provided file. If questions are not related to campervans or you really don't know the answer, say "I'm sorry, I don't know the answer to that." And direct the questioner to email help@vanlife.com. Don't try to make up an answer. Never include sources or annotations in your reply. Keep your answers short.`,
		tools: [{ type: "retrieval" }]
	})
	return run
}

// List thread messages
const listMessages = async () => {
	return await openai.beta.threads.messages.list(threadID)
}

// Get the current run
const retrieveRun = async (thread: string, run: string) => {
	return await openai.beta.threads.runs.retrieve(thread, run)
}

const handler: Handler = async (e) => {
	try {
		// Create a message
		await createMessage(e.body as string)

		// Create a run
		const run = await runThread()

		// Retrieve the current run
		let currentRun = await retrieveRun(threadID, run.id)

		// Keep Run status up to date
		// Poll for updates and check if run status is completed
		while (currentRun.status !== "completed") {
			await new Promise((resolve) => setTimeout(resolve, 1500))
			console.log(currentRun.status)
			currentRun = await retrieveRun(threadID, run.id)
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
