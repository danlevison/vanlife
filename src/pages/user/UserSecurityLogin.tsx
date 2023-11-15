import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updatePassword } from "@/api"
import { signInUser } from "@/api"
import useAuth from "@/hooks/useAuth"

export default function UserSecurityLogin() {
	const { user, signOut } = useAuth()
	const [formData, setFormData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: ""
	})
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
		general: ""
	})
	const [message, setMessage] = useState("")

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[e.target.name]: e.target.value
		}))

		setErrors((prevErrors) => ({
			...prevErrors,
			[e.target.name]: "",
			general: ""
		}))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (
			formData.currentPassword.length < 6 ||
			formData.newPassword.length < 6 ||
			formData.confirmPassword.length < 6
		) {
			setErrors({
				currentPassword:
					formData.currentPassword.length < 6
						? "Your password should be at least 6 characters"
						: "",
				newPassword:
					formData.newPassword.length < 6
						? "Your password should be at least 6 characters"
						: "",
				confirmPassword:
					formData.confirmPassword.length < 6
						? "Your password should be at least 6 characters"
						: "",
				general: ""
			})
			return
		}

		if (formData.newPassword !== formData.confirmPassword) {
			setErrors({
				currentPassword: "",
				newPassword: "",
				confirmPassword: "Passwords do not match",
				general: ""
			})
			return
		}

		try {
			setErrors({
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
				general: ""
			})
			setLoading(true)
			const userEmail = user?.email ?? ""
			const data = await signInUser(userEmail, formData.currentPassword)

			if (data.user?.id) {
				await updatePassword(formData.newPassword)
				setMessage(
					"Your password has been successfully reset! Please re-login."
				)
				signOut()
			} else {
				setErrors({
					currentPassword: "",
					newPassword: "",
					confirmPassword: "",
					general: "Your password could not be reset, please try again."
				})
			}
		} catch (error) {
			console.error(error)
			setErrors({
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
				general: "An error occurred while updating the password."
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex flex-grow flex-col w-full">
			<h2 className="text-2xl">Reset password</h2>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 max-w-[600px] py-5 border-b"
				noValidate
			>
				<div>
					<Label htmlFor="currentPassword">Current password*</Label>
					<Input
						onChange={handleChange}
						value={formData.currentPassword}
						type="password"
						id="currentPassword"
						name="currentPassword"
						required
						className={`py-5 hover:border-secondaryAccent ${
							errors.currentPassword && "border-red-500"
						}`}
					/>
					{errors.currentPassword && (
						<p className="text-sm text-red-500 mb-1">
							{errors.currentPassword}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="newPassword">New password*</Label>
					<Input
						onChange={handleChange}
						value={formData.newPassword}
						type="password"
						id="newPassword"
						name="newPassword"
						required
						className={`py-5 hover:border-secondaryAccent ${
							errors.newPassword && "border-red-500"
						}`}
					/>
					{errors.newPassword && (
						<p className="text-sm text-red-500 mb-1">{errors.newPassword}</p>
					)}
				</div>
				<div>
					<Label htmlFor="confirmPassword">Confirm password*</Label>
					<Input
						onChange={handleChange}
						value={formData.confirmPassword}
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						required
						className={`py-5 hover:border-secondaryAccent ${
							errors.confirmPassword && "border-red-500"
						}`}
					/>
					{errors.confirmPassword && (
						<p className="text-sm text-red-500 mb-1">
							{errors.confirmPassword}
						</p>
					)}
				</div>
				{errors.general && (
					<div className="border-2 border-red-600 p-5 rounded-lg">
						<h2 className="text-lg text-red-600">
							Password reset unsuccessful
						</h2>
						<p className="text-sm mt-4">{errors.general}</p>
					</div>
				)}
				{message && (
					<div className="border-2 border-green-600 p-5 rounded-lg">
						<h2 className="text-lg text-green-600">
							Password reset successful
						</h2>
						<p className="text-sm mt-4">{message}</p>
					</div>
				)}
				<Button
					className="w-full sm:w-[150px]"
					disabled={
						loading ||
						!(
							formData.currentPassword &&
							formData.newPassword &&
							formData.confirmPassword
						)
					}
				>
					Change password
				</Button>
			</form>
		</div>
	)
}
