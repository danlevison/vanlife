import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { VscAccount } from "react-icons/vsc"
import { CiLogout } from "react-icons/ci"
import { GoPencil } from "react-icons/go"
import { AiOutlineUser } from "react-icons/ai"
import { MdOutlineDashboard } from "react-icons/md"
import useAuth from "@/hooks/useAuth"

type MobileNavUserProfileProps = {
	handleNav: () => void
}

export default function MobileNavUserProfile({
	handleNav
}: MobileNavUserProfileProps) {
	const { user, signOut } = useAuth()
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-4">
				<VscAccount size={25} />
				<div>
					<h3 className="text-lg">{user?.user_metadata.name}</h3>
					<p className="text-sm">{user?.email}</p>
				</div>
			</div>

			<ul className="text-base">
				<li className="py-2">
					<Link
						to="user"
						onClick={handleNav}
						className="flex items-center gap-4 hover:text-accent duration-150"
					>
						<AiOutlineUser size={25} />
						My profile
					</Link>
				</li>
				<li className="py-4">
					<Link
						to="user/details"
						onClick={handleNav}
						className="flex items-center gap-4 hover:text-accent duration-150"
					>
						<GoPencil size={25} />
						Account details
					</Link>
				</li>
				<li className="py-2">
					<Link
						to="host"
						onClick={handleNav}
						className="flex items-center gap-4 hover:text-accent duration-150"
					>
						<MdOutlineDashboard size={25} />
						Host dashboard
					</Link>
				</li>
			</ul>
			<Button
				onClick={signOut}
				variant={"link"}
				className="flex items-center gap-4 mr-auto p-0 text-base"
			>
				<CiLogout size={25} />
				Log out
			</Button>
		</div>
	)
}
