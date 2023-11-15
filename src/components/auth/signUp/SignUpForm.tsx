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
	const [errors, setErrors] = useState({
		name: "",
		signUpEmail: "",
		signUpPassword: "",
		general: ""
	})
	const [loading, setLoading] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[e.target.name]: e.target.value
			}
		})

		setErrors((prevErrors) => {
			return {
				...prevErrors,
				[e.target.name]: "",
				general: ""
			}
		})
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Validation
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
		if (!emailRegex.test(formData.signUpEmail)) {
			return setErrors({
				name: "",
				signUpEmail: "Please enter a valid email address",
				signUpPassword: "",
				general: ""
			})
		}

		if (formData.signUpPassword.length < 6) {
			return setErrors({
				name: "",
				signUpEmail: "",
				signUpPassword: "Your password should be at least 6 characters",
				general: ""
			})
		}

		try {
			setErrors({
				name: "",
				signUpEmail: "",
				signUpPassword: "",
				general: ""
			})
			setLoading(true)
			const data = await signUpNewUser(
				formData.name,
				formData.signUpEmail,
				formData.signUpPassword
			)

			if (data && data.user) {
				if (data.user.identities && data.user.identities?.length > 0) {
					// if the account is not already registered
					setSignedUp(true)
				} else {
					return setErrors({
						name: "",
						signUpEmail:
							"The email address you're trying to use is already linked to an account. Please try a different email address.",
						signUpPassword: "",
						general: ""
					})
				}
			}
		} catch (error) {
			console.error(error)
			setErrors({
				name: "",
				signUpEmail: "",
				signUpPassword: "",
				general: "An error occurred while signing up. Please try again."
			})
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
					errors.signUpEmail && "border-red-500 mb-0"
				}`}
			/>
			{errors.signUpEmail && (
				<p className="text-sm text-red-500 mb-1">{errors.signUpEmail}</p>
			)}
			<Label htmlFor="email">Password*</Label>
			<Input
				onChange={handleChange}
				value={formData.signUpPassword}
				type="password"
				id="signUpPassword"
				name="signUpPassword"
				required
				className={`bg-transparent ${
					errors.signUpPassword && "border-red-500"
				}`}
			/>
			{errors.signUpPassword && (
				<p className="text-sm text-red-500 mb-1">{errors.signUpPassword}</p>
			)}
			{errors.general && (
				<div className="border-2 border-red-600 mt-4 p-5 rounded-lg">
					<h2 className="text-lg text-red-600">Sign up unsuccessful</h2>
					<p className="text-sm mt-2">{errors.general}</p>
				</div>
			)}
			<Button
				disabled={
					loading ||
					!(formData.name && formData.signUpEmail && formData.signUpPassword)
				}
				className="w-full mt-4"
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
