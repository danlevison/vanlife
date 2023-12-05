import { useState, useRef, useEffect } from "react"
import useAuth from "@/hooks/useAuth"
import supabase from "@/config/supabaseClient"
import { useLocation, useNavigate } from "react-router-dom"
// import { openai } from "@/config/openAiConfig"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FaAngleDown } from "react-icons/fa"
import Lottie from "lottie-react"
import typingAnimation from "@/assets/typing-animation.json"
// import vanInfo from "./vansInfo.txt"
import OpenAssistantButton from "./OpenAssistantButton"
//types
import { MessageContentText } from "openai/resources/beta/threads/messages/messages.mjs"

export default function Assistant() {
	const { user } = useAuth()
	const [showChat, setShowChat] = useState(false)
	const [userInput, setUserInput] = useState("")
	const [messages, setMessages] = useState<string[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()
	const location = useLocation()
	const autoScrollAnchorRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (messages.length) {
			autoScrollAnchorRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "end"
			})
		}
	}, [messages.length])

	// const getFile = async () => {
	// 	// Upload a file with an "assistants" purpose
	// 	const file = await openai.files.create({
	// 		file: await fetch(vanInfo),
	// 		purpose: "assistants"
	// 	})

	// 	console.log(file)
	// }

	// getFile()

	const fetchAssistantIds = async () => {
		const url =
			"https://yourvanlife.netlify.app/.netlify/functions/createAssistant"

		try {
			const response = await fetch(url)
			const data = await response.json()
			return data
		} catch (error) {
			console.error(error)
		}
	}

	const handleOpenAssistant = async () => {
		if (!user) {
			navigate("/sign-in", { state: { from: location } })
		} else {
			setShowChat(true)

			if (
				user.user_metadata.asstId === undefined &&
				user.user_metadata.threadId === undefined
			) {
				try {
					const data = await fetchAssistantIds()
					const asstId = data.ids.assistantId
					const threadId = data.ids.threadId

					await supabase.auth.updateUser({
						data: { asstId, threadId }
					})
				} catch (error) {
					console.error("Error updating user metadata:", error)
					setError("Sorry, something went wrong. Please try again.")
				}
			}
		}
	}

	const claimCredit = async () => {
		await supabase.auth.updateUser({
			data: { credit: 4 }
		})
	}

	const fetchReply = async () => {
		const url =
			"https://yourvanlife.netlify.app/.netlify/functions/fetchAssistant"

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"content-type": "text/plain"
				},
				body: JSON.stringify({
					userInput,
					asstId: user?.user_metadata.asstId as string,
					threadId: user?.user_metadata.threadId as string
				})
			})

			console.log("Response status:", response.status)

			const data = await response.json()
			return data
		} catch (error) {
			console.error("Fetch error:", error)
			setError("Sorry, something went wrong. Please try again.")
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (user?.user_metadata.credit === 0 || !user?.user_metadata.credit) {
			setError("You have used up all of your credit")
			return
		}

		setMessages((prevMessages) => [...prevMessages, userInput])

		try {
			setLoading(true)
			setError(null)
			const data = await fetchReply()
			setMessages((prevMessages) => [
				...prevMessages,
				(data.reply[0].content[0] as MessageContentText).text.value
			])
			await supabase.auth.updateUser({
				data: { credit: user?.user_metadata.credit - 1 }
			})
		} catch (error) {
			console.error(error)
			setMessages((prevMessages) => [
				...prevMessages,
				"Sorry, something went wrong. Please try again."
			])
		} finally {
			setLoading(false)
			setUserInput("")
			inputRef.current?.focus()
		}
	}

	return showChat && user ? (
		<div className="flex flex-col fixed bottom-2 right-2 w-full h-full max-w-[400px] max-h-[500px] bg-white rounded-lg z-50">
			<div className="flex justify-between items-center bg-accent h-16 rounded-t-lg p-3">
				<div>
					<h2 className="text-xl text-white">#VANLIFE</h2>
					<div className="flex items-center gap-2">
						<p className="text-white">Credit: {user.user_metadata.credit}</p>
						{user.user_metadata.credit === undefined && (
							<button
								onClick={claimCredit}
								className="text-white underline"
							>
								Claim credit
							</button>
						)}
					</div>
				</div>
				<Button
					onClick={() => setShowChat(false)}
					variant={"link"}
					className="text-white"
				>
					<FaAngleDown size={25} />
				</Button>
			</div>
			<div className="flex flex-col gap-5 m-3 max-h-[350px] overflow-auto">
				<div>
					<span className="font-bold">#VANLIFE Assistant</span>
					<p className="bg-gray-200 p-3 rounded-lg">
						Hello, I am the #VANLIFE assistant. I can provide you information
						about our listed campers or recommend you a campervan based on your
						type of adventure.{" "}
					</p>
				</div>

				{messages.map((message, i) => {
					if (i % 2 === 0) {
						return (
							<div key={i}>
								<span className="font-bold">You</span>
								<p className="bg-blue-200 p-3 rounded-lg">{message}</p>
							</div>
						)
					} else {
						return (
							<div key={i}>
								<span className="font-bold">#VANLIFE Assistant</span>
								<p
									className={`bg-gray-200 p-3 rounded-lg ${
										message === "Sorry, something went wrong. Please try again."
											? "text-red-500"
											: ""
									}`}
								>
									{message}
								</p>
							</div>
						)
					}
				})}

				{error && <p className="text-red-500">{error}</p>}
				{loading && (
					<Lottie
						className="w-16"
						animationData={typingAnimation}
					/>
				)}
				<div ref={autoScrollAnchorRef} />
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
		<OpenAssistantButton handleOpenAssistant={handleOpenAssistant} />
	)
}
