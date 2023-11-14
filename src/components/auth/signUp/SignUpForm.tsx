import { useState } from "react"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { signUpNewUser } from "@/api"
import Spinner from "@/components/Spinner"

type SignUpFormType = {
	setSignedUp: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SignUpForm({ setSignedUp }: SignUpFormType) {
	const [formData, setFormData] = useState({
		name: "",
		signUpEmail: "",
		signUpPassword: ""
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
		if (!emailRegex.test(formData.signUpEmail)) {
			return setError("Please enter a valid email address")
		}
		try {
			setError("")
			setLoading(true)
			const data = signUpNewUser(
				formData.name,
				formData.signUpEmail,
				formData.signUpPassword
			)
			console.log(data)
			setSignedUp(true)
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
			<Label htmlFor="name">Name*</Label>
			<Input
				onChange={handleChange}
				value={formData.name}
				type="text"
				id="name"
				name="name"
				required
				className="bg-transparent mb-2"
			/>
			<Label htmlFor="email">Email*</Label>
			<Input
				onChange={handleChange}
				value={formData.signUpEmail}
				type="email"
				id="signUpEmail"
				name="signUpEmail"
				required
				className={`bg-transparent mb-2 ${
					error === "Please enter a valid email address" &&
					"border-red-500 mb-0"
				}`}
			/>
			{error === "Please enter a valid email address" && (
				<p className="text-sm text-red-500 mb-1">{error}</p>
			)}
			<Label htmlFor="email">Password*</Label>
			<Input
				onChange={handleChange}
				value={formData.signUpPassword}
				type="password"
				id="signUpPassword"
				name="signUpPassword"
				required
				className={`bg-transparent mb-4 ${
					error === "Invalid password" && "border-red-500"
				}`}
			/>
			<Button
				disabled={
					loading ||
					!(formData.name && formData.signUpEmail && formData.signUpPassword)
				}
				className="w-full"
			>
				{loading ? (
					<>
						Signing up{" "}
						<span className="ml-2">
							<Spinner />
						</span>
					</>
				) : (
					"Sign up"
				)}
			</Button>
		</form>
	)
}
