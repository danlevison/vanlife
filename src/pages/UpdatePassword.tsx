import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { updatePassword } from "@/api"
import Spinner from "@/components/Spinner"
import { FaRegCheckCircle } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function UpdatePassword() {
	const [password, setPassword] = useState("")
	const [message, setMessage] = useState("")
	const [errors, setErrors] = useState({
		password: "",
		general: ""
	})
	const [loading, setLoading] = useState(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
		setErrors((prevErrors) => ({
			...prevErrors,
			[e.target.name]: "",
			general: ""
		}))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (password.length < 6) {
			setErrors({
				password:
					password.length < 6
						? "Your password should be at least 6 characters"
						: "",
				general: ""
			})
			return
		}

		try {
			setErrors({
				password: "",
				general: ""
			})
			setLoading(true)
			await updatePassword(password)
			setMessage("Your password has been successfully reset!")
		} catch (error) {
			console.error(error)
			setErrors({
				password: "",
				general: "An error occurred while updating the password."
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex flex-col justify-center items-center h-full py-60 px-10">
			<h1 className="text-2xl sm:text-3xl md:text-4xl text-center">
				Update your password
			</h1>
			{message ? (
				<div className="flex flex-col justify-center items-center gap-4 mt-4">
					<FaRegCheckCircle
						size={50}
						className="text-secondaryAccent"
					/>
					<p className="text-sm text-center">{message}</p>
					<Link
						to={"/"}
						className="bg-accent rounded-lg px-6 py-2 w-full max-w-[200px] text-white text-center hover:opacity-70 duration-300"
					>
						Back to homepage
					</Link>
				</div>
			) : (
				<form
					onSubmit={handleSubmit}
					noValidate
					className="mt-6 w-full max-w-[400px]"
				>
					<Label htmlFor="password">Please enter a new password*</Label>
					<Input
						onChange={handleChange}
						value={password}
						type="password"
						id="password"
						name="password"
						required
						className={`bg-transparent mb-2 ${
							errors.password && "border-red-500 mb-0"
						}`}
					/>
					{errors.password && (
						<p className="text-sm text-red-500 mb-1">{errors.password}</p>
					)}
					{errors.general && (
						<div className="border-2 border-red-600 p-5 rounded-lg">
							<h2 className="text-lg text-red-600">
								Password reset unsuccessful
							</h2>
							<p className="text-sm mt-4">{errors.general}</p>
						</div>
					)}
					<Button
						disabled={loading || !password}
						className="w-full"
					>
						{loading ? (
							<>
								Resetting password{" "}
								<span className="ml-2">
									<Spinner />
								</span>
							</>
						) : (
							"Reset my password"
						)}
					</Button>
				</form>
			)}
		</div>
	)
}
