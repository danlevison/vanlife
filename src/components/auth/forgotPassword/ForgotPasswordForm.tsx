import { useState } from "react"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { sendResetPasswordEmail } from "@/api"

export default function ForgotPasswordForm() {
	const [resetEmail, setResetEmail] = useState("")
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Validation
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
		if (!emailRegex.test(resetEmail)) {
			return setError("Please enter a valid email address")
		}

		try {
			setError("")
			setLoading(true)
			await sendResetPasswordEmail(resetEmail)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			noValidate
			className="mt-2 w-full"
		>
			<Label htmlFor="resetEmail">Email</Label>
			<Input
				onChange={(e) => setResetEmail(e.target.value)}
				value={resetEmail}
				type="email"
				id="resetEmail"
				name="resetEmail"
				required
				className={`bg-transparent mb-2 ${
					error === "Please enter a valid email address" &&
					"border-red-500 mb-0"
				}`}
			/>
			{error === "Please enter a valid email address" && (
				<p className="text-sm text-red-500 mb-1">{error}</p>
			)}
			<Button
				disabled={loading || !resetEmail}
				className="w-full"
			>
				Reset my password
			</Button>
		</form>
	)
}
