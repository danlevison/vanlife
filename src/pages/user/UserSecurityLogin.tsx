import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UserSecurityLogin() {
	const [formData, setFormData] = useState({
		previousPassword: "",
		newPassword: "",
		confirmPassword: ""
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[e.target.name]: e.target.value
			}
		})
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<div className="flex flex-grow flex-col w-full">
			<h2 className="text-2xl">Reset password</h2>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 max-w-[600px] py-5 border-b"
			>
				<div>
					<Label htmlFor="previous-password">Previous password*</Label>
					<Input
						onChange={handleChange}
						value={formData.previousPassword}
						type="password"
						id="previousPassword"
						name="previousPassword"
						required
						className="py-5 hover:border-secondaryAccent"
					/>
				</div>
				<div>
					<Label htmlFor="new-password">New password*</Label>
					<Input
						onChange={handleChange}
						value={formData.newPassword}
						type="password"
						id="newPassword"
						name="newPassword"
						required
						className="py-5 hover:border-secondaryAccent"
					/>
				</div>
				<div>
					<Label htmlFor="confirm-password">Confirm password*</Label>
					<Input
						onChange={handleChange}
						value={formData.confirmPassword}
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						required
						className="py-5 hover:border-secondaryAccent"
					/>
				</div>
				<Button className="w-full sm:w-[150px]">Change password</Button>
			</form>
		</div>
	)
}
