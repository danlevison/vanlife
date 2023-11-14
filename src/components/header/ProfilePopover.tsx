import { Link } from "react-router-dom"
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover"
import { VscAccount } from "react-icons/vsc"
import useAuth from "@/hooks/useAuth"
import { Button } from "../ui/button"

export default function ProfilePopover() {
	const { user, signOut } = useAuth()
	const usersName = user?.user_metadata.first_name
	const usersEmail = user?.email

	return (
		<Popover>
			<PopoverTrigger>
				<VscAccount size={25} />
			</PopoverTrigger>
			<PopoverContent align="end">
				<div className="text-center pb-4">
					<h2 className="text-2xl">{usersName}</h2>
					<p className="text-[#BFBFBF]">{usersEmail}</p>
				</div>
				<ul className="border-y border-gray-[#BFBFBF] py-4">
					<li className="py-2">
						<Link
							to="user"
							className="hover:text-accent duration-150"
						>
							My profile
						</Link>
					</li>
					<li className="py-2">
						<Link
							to="user/details"
							className="hover:text-accent duration-150"
						>
							Account details
						</Link>
					</li>
				</ul>
				<Button
					onClick={signOut}
					variant={"link"}
					className="mt-2 p-0 text-base"
				>
					Log out
				</Button>
			</PopoverContent>
		</Popover>
	)
}
