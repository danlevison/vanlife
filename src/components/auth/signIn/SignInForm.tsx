import { useState } from "react"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { signInUser, authStateChange } from "@/api"

export default function SignInForm() {
	const [formData, setFormData] = useState({
		signInEmail: "",
		signInPassword: ""
	})
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[e.target.name]: e.target.value
			}
		})
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Validation
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
		if (!emailRegex.test(formData.signInEmail)) {
			return setError("Please enter a valid email address")
		}

		try {
			setError("")
			setLoading(true)
			await signInUser(formData.signInEmail, formData.signInPassword)
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
			className="mt-2"
		>
			<Label htmlFor="signInEmail">Email</Label>
			<Input
				onChange={handleChange}
				value={formData.signInEmail}
				type="email"
				id="signInEmail"
				name="signInEmail"
				required
				className={`bg-transparent mb-2 ${
					error === "Please enter a valid email address" &&
					"border-red-500 mb-0"
				}`}
			/>
			{error === "Please enter a valid email address" && (
				<p className="text-sm text-red-500 mb-1">{error}</p>
			)}
			<Label htmlFor="signInPassword">Password</Label>
			<Input
				onChange={handleChange}
				value={formData.signInPassword}
				type="password"
				id="signInPassword"
				name="signInPassword"
				required
				className="bg-transparent mb-4"
			/>
			<Button
				disabled={loading || !(formData.signInEmail && formData.signInPassword)}
				className="w-full"
			>
				Sign in
			</Button>
		</form>
	)
}
