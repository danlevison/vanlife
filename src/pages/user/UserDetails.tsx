import useAuth from "@/hooks/useAuth"
import UserDetailItem from "@/components/user/UserDetailItem"

export default function UserDetails() {
	const { user } = useAuth()

	return (
		<div className="flex flex-grow flex-col w-full">
			<h2 className="text-2xl">Account details</h2>
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
		</div>
	)
}
