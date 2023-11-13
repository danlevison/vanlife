import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { VscAccount } from "react-icons/vsc"
import { CiLogout } from "react-icons/ci"
import { GoPencil } from "react-icons/go"
import { AiOutlineUser } from "react-icons/ai"
import useAuth from "@/hooks/useAuth"

export default function MobileNavProfile() {
	const { user, signOut } = useAuth()
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-6">
				<VscAccount size={30} />
				<div>
					<h3 className="text-lg">{user?.user_metadata.first_name}</h3>
					<p className="text-sm">{user?.email}</p>
				</div>
			</div>

			<ul className="text-base">
				<li className="py-2">
					<Link
						to="/"
						className="flex items-center gap-6 hover:text-accent duration-150"
					>
						<AiOutlineUser size={25} />
						<p>My profile</p>
					</Link>
				</li>
				<li className="py-4">
					<Link
						to="/"
						className="flex items-center gap-6 hover:text-accent duration-150"
					>
						<GoPencil size={25} />
						<p>Account details</p>
					</Link>
				</li>
			</ul>
			<Button
				onClick={signOut}
				variant={"link"}
				className="flex items-center gap-6 mr-auto p-0 text-base"
			>
				<CiLogout size={25} />
				<p>Log out</p>
			</Button>
		</div>
	)
}
