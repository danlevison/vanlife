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
	const usersName = user?.user_metadata.name
	const usersEmail = user?.email

	return (
		<Popover>
			<PopoverTrigger>
				<VscAccount size={25} />
			</PopoverTrigger>
			<PopoverContent align="end">
				<div className="text-center pb-4">
					<h2 className="text-2xl">{usersName}</h2>
					<p className="text-[#737373]">{usersEmail}</p>
				</div>
				<ul className="border-t border-gray-300">
					<li className="pt-3 pb-2">
						<Link
							to="user"
							className="text-[#737373] hover:text-accent duration-150"
						>
							My profile
						</Link>
					</li>
					<li className="pb-3 pt-2">
						<Link
							to="user/details"
							className="text-[#737373] hover:text-accent duration-150"
						>
							Account details
						</Link>
					</li>
					<li className="py-3 border-y border-gray-300 ">
						<Link
							to="host"
							className="text-[#737373] hover:text-accent duration-150"
						>
							Host dashboard
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
