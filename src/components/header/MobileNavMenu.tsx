import { NavLink } from "react-router-dom"
import MobileNavUserProfile from "./MobileNavUserProfile"
import AuthModal from "../auth/AuthModal"
import useAuth from "@/hooks/useAuth"
import MobileMenuCloseBtn from "./MobileMenuCloseBtn"

type MobileNavMenuProps = {
	handleNav: () => void
	nav: boolean
	activeStyles: string
}

export default function MobileNavMenu({
	handleNav,
	nav,
	activeStyles
}: MobileNavMenuProps) {
	const { user } = useAuth()
	return (
		<div className={nav ? "md:hidden" : ""}>
			<div
				className={`fixed top-0 h-screen px-10 py-[1.5rem] border-x border-gray-200 ${
					nav
						? "right-0 w-[300px] duration-300 bg-[#fff7ed]"
						: "right-[-100%] duration-500"
				}`}
			>
				<div className="flex items-center justify-between border-b pb-2 mb-4">
					<h2 className="text-2xl">Menu</h2>
					<MobileMenuCloseBtn handleNav={handleNav} />
				</div>
				<div>
					{user ? (
						<MobileNavUserProfile handleNav={handleNav} />
					) : (
						<AuthModal />
					)}
				</div>

				<div className="py-6">
					<h3 className="border-b border-gray-300 text-lg pb-2">
						Main navigation
					</h3>
					<ul className="flex flex-col gap-6 mt-4">
						<li>
							<NavLink
								to="vans"
								onClick={handleNav}
								className={({ isActive }) =>
									isActive
										? activeStyles
										: "hover:text-secondaryAccent hover:border-b-2 border-secondaryAccent py-1"
								}
							>
								Our Vans
							</NavLink>
						</li>
						<li>
							<NavLink
								to="host"
								onClick={handleNav}
								className={({ isActive }) =>
									isActive
										? activeStyles
										: "hover:text-secondaryAccent hover:border-b-2 border-secondaryAccent py-1"
								}
							>
								Host
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
