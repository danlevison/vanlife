import { useState } from "react"
import useAuth from "@/hooks/useAuth"
import UserDetailItem from "@/components/user/UserDetailItem"
import { Button } from "@/components/ui/button"
import UserDetailsForm from "./UserDetailsForm"

export default function UserDetails() {
	const { user } = useAuth()
	const [showForm, setShowForm] = useState(false)

	return (
		<div className="flex flex-grow flex-col w-full">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl">Account details</h2>
				<Button
					variant={"link"}
					onClick={() => setShowForm(!showForm)}
					className="text-base"
				>
					{!showForm ? "Edit" : "Cancel"}
				</Button>
			</div>
			{showForm ? (
				<UserDetailsForm setShowForm={setShowForm} />
			) : (
				<ul className="flex flex-col">
					<UserDetailItem
						label="Name"
						value={user?.user_metadata.name}
					/>
					<UserDetailItem
						label="Country of residence"
						value={user?.user_metadata.country}
					/>
					<UserDetailItem
						label="Date of birth"
						value={user?.user_metadata.date_of_birth}
					/>
					<UserDetailItem
						label="Phone number"
						value={user?.user_metadata.phone}
					/>
					<UserDetailItem
						label="Email"
						value={user?.email}
					/>
				</ul>
			)}
		</div>
	)
}
