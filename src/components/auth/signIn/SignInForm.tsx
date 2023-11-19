import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { signInUser } from "@/api"
import Spinner from "@/components/Spinner"

export default function SignInForm() {
	const [formData, setFormData] = useState({
		signInEmail: "",
		signInPassword: ""
	})
	const [errors, setErrors] = useState({
		signInEmail: "",
		signInPassword: "",
		general: ""
	})
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

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
			return setErrors({
				signInEmail: "Please enter a valid email address",
				signInPassword: "",
				general: ""
			})
		}

		if (formData.signInPassword.length < 6) {
			return setErrors({
				signInEmail: "",
				signInPassword: "Your password should be at least 6 characters",
				general: ""
			})
		}

		try {
			setErrors({
				signInEmail: "",
				signInPassword: "",
				general: ""
			})
			setLoading(true)
			const data = await signInUser(
				formData.signInEmail,
				formData.signInPassword
			)
			//TODO: use history to navigate user to page they were at when logging in.
			if (data.user) {
				navigate("/")
			}

			if (!data.user) {
				return setErrors({
					signInEmail: "",
					signInPassword:
						"Oops! The email and password you entered do not match. Please try again.",
					general: ""
				})
			}
		} catch (error) {
			console.error(error)
			setErrors({
				signInEmail: "",
				signInPassword: "",
				general: "An error occurred while signing in. Please try again."
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
			<Label htmlFor="signInEmail">Email</Label>
			<Input
				onChange={handleChange}
				value={formData.signInEmail}
				type="email"
				id="signInEmail"
				name="signInEmail"
				required
				className={`bg-transparent mb-2 ${
					errors.signInEmail && "border-red-500 mb-0"
				}`}
			/>
			{errors.signInEmail && (
				<p className="text-sm text-red-500 mb-1">{errors.signInEmail}</p>
			)}
			<Label htmlFor="signInPassword">Password</Label>
			<Input
				onChange={handleChange}
				value={formData.signInPassword}
				type="password"
				id="signInPassword"
				name="signInPassword"
				required
				className={`bg-transparent ${
					errors.signInPassword && "border-red-500"
				}`}
			/>
			{errors.signInPassword && (
				<p className="text-sm text-red-500 mb-1">{errors.signInPassword}</p>
			)}
			{errors.general && (
				<div className="border-2 border-red-600 mt-4 p-5 rounded-lg">
					<h2 className="text-lg text-red-600">Sign in unsuccessful</h2>
					<p className="text-sm mt-2">{errors.general}</p>
				</div>
			)}
			<Button
				disabled={loading || !(formData.signInEmail && formData.signInPassword)}
				className="w-full mt-4"
			>
				{loading ? (
					<>
						Signing in{" "}
						<span className="ml-2">
							<Spinner />
						</span>
					</>
				) : (
					"Sign in"
				)}
			</Button>
		</form>
	)
}
