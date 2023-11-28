import { useState, useRef } from "react"
import { openai } from "@/config/openAiConfig"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { BsFillChatSquareDotsFill } from "react-icons/bs"
import { FaAngleDown } from "react-icons/fa"
// import vanInfo from "./vansInfo.txt"
import Lottie from "lottie-react"
import typingAnimation from "@/assets/typing-animation.json"
//types
import { MessageContentText } from "openai/resources/beta/threads/messages/messages.mjs"

export default function Assistant() {
	const [showChat, setShowChat] = useState(false)
	const [userInput, setUserInput] = useState("")
	const [response, setResponse] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const assistantID = "asst_619dFmW3XVqF7ZGxZ7p4wE3m"
	const threadID = "thread_htFn6hZERUUOEHYpNTKOYQc9"

	// const getFile = async () => {
	// 	// Upload a file with an "assistants" purpose
	// 	const file = await openai.files.create({
	// 		file: await fetch(vanInfo),
	// 		purpose: "assistants"
	// 	})

	// 	console.log(file)
	// }

	// getFile()

	// Create #VANLIFE Assistant
	// const createAssistant = async () => {
	// 	const myAssistant = await openai.beta.assistants.create({
	// 		instructions: `You are great at recommending campervans. When asked a question, use the information in the provided file to form a friendly response. If you cannot find the answer in the file, do not make up an answer. Just reply with "Sorry, I do not know.". Never provide annotations like these (【14†source】) in your reply.`,
	// 		name: "#VANLIFE assistant",
	// 		tools: [{ type: "retrieval" }],
	// 		model: "gpt-4-1106-preview",
	// 		file_ids: ["file-4yjtaezldjIBu78NcfBiA69U"]
	// 	})

	// 	console.log(myAssistant)
	// }

	// createAssistant()

	// const threadFunc = async () => {
	// 	const thread = await openai.beta.threads.create()
	// 	console.log(thread)
	// }

	// threadFunc()

	/* -- Assistants API Functions -- */

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			setLoading(true)
			setError(null)
			// Create a message
			await createMessage(userInput)

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
			setResponse((data[0].content[0] as MessageContentText).text.value)
		} catch (error) {
			console.error(error)
			setError("Sorry, something went wrong. Please try again.")
		} finally {
			setLoading(false)
			setUserInput("")
			inputRef.current?.focus()
		}
	}

	return showChat ? (
		<div className="flex flex-col fixed bottom-2 right-2 w-full h-full max-w-[400px] max-h-[500px] bg-white rounded-lg z-50">
			<div className="flex justify-between items-center bg-accent h-16 rounded-t-lg p-3">
				<h2 className="text-xl text-white">#VANLIFE</h2>
				<Button
					onClick={() => setShowChat(false)}
					variant={"link"}
					className="text-white"
				>
					<FaAngleDown size={25} />
				</Button>
			</div>
			<div className="flex flex-col gap-5 m-3 max-h-[350px] overflow-y-auto">
				<p className="bg-gray-200 p-3 rounded-lg">
					Hello, I am the #VANLIFE assistant. I can provide you some information
					about our listed campers or recommend you a campervan based on your
					type of adventure.
				</p>
				{error && <p className="text-red-500">{error}</p>}
				{response && <p className="bg-gray-200 p-3 rounded-lg">{response}</p>}
				{loading && (
					<Lottie
						className="w-16"
						animationData={typingAnimation}
					/>
				)}
			</div>
			<form
				onSubmit={handleSubmit}
				className="flex items-center gap-2 p-3 absolute bottom-0 w-full"
			>
				<Input
					onChange={(e) => setUserInput(e.target.value)}
					value={userInput}
					type="text"
					ref={inputRef}
					autoFocus
					placeholder="e.g. recommend me a van for the beach"
					className="bg-white"
				/>
				<Button disabled={loading || !userInput}>Send</Button>
			</form>
		</div>
	) : (
		<div className="hidden md:block fixed bottom-2 right-5">
			<button onClick={() => setShowChat(true)}>
				<BsFillChatSquareDotsFill
					size={50}
					className="text-accent hover:text-accent/80"
				/>
			</button>
		</div>
	)
}
