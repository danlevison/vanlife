import { useState } from "react"
import useAuth from "@/hooks/useAuth"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Spinner from "@/components/Spinner"
import { updateUserDetails } from "@/api"

export default function UserDetailsForm({
	setShowForm
}: {
	setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const { user } = useAuth()
	const [formData, setFormData] = useState({
		name: String(user?.user_metadata.name) || "",
		country: String(user?.user_metadata.country) || "",
		dob: String(user?.user_metadata.date_of_birth) || "",
		phone: String(user?.user_metadata.phone) || ""
	})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

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

		try {
			setError("")
			setLoading(false)
			await updateUserDetails(
				formData.name,
				formData.country,
				formData.dob,
				formData.phone
			)
			setShowForm(false)
		} catch (error) {
			console.error(error)
			setError(
				"An error occurred while updating account details. Please try again."
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="pt-4"
		>
			<Label
				htmlFor="name"
				className="text-base"
			>
				Name
			</Label>
			<Input
				onChange={handleChange}
				defaultValue={formData.name}
				type="text"
				id="name"
				name="name"
				required
				className="mb-5"
			/>
			<Label
				htmlFor="country"
				className="text-base"
			>
				Country of residence
			</Label>
			<Input
				onChange={handleChange}
				defaultValue={formData.country}
				type="text"
				id="country"
				name="country"
				required
				className="mb-5"
			/>
			<Label
				htmlFor="dob"
				className="text-base"
			>
				Date of birth
			</Label>
			<Input
				onChange={handleChange}
				defaultValue={formData.dob}
				type="date"
				id="dob"
				name="dob"
				required
				className="mb-5"
			/>
			<Label
				htmlFor="phone"
				className="text-base"
			>
				Phone number
			</Label>
			<Input
				onChange={handleChange}
				defaultValue={formData.phone}
				type="tel"
				id="phone"
				name="phone"
				required
				className="mb-5"
			/>
			<Label
				htmlFor="email"
				className="text-base"
			>
				Email
			</Label>
			<Input
				defaultValue={user?.email}
				type="email"
				id="email"
				name="email"
				disabled
				className="mb-5"
			/>
			{error && (
				<div className="border-2 border-red-600 p-5 rounded-lg mb-4">
					<h2 className="text-lg text-red-600">
						Could not update account details
					</h2>
					<p className="text-sm mt-4">{error}</p>
				</div>
			)}
			<Button
				disabled={
					loading ||
					!(formData.name && formData.country && formData.dob && formData.phone)
				}
				className="px-5"
			>
				{loading ? (
					<>
						Saving...{" "}
						<span className="ml-2">
							<Spinner />
						</span>
					</>
				) : (
					"Save"
				)}
			</Button>
			<Button
				onClick={() => setShowForm(false)}
				variant={"link"}
				type="button"
			>
				Cancel
			</Button>
		</form>
	)
}
