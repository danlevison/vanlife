import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { BiMenu } from "react-icons/bi"
import { AiOutlineClose } from "react-icons/ai"
import AuthPopover from "./auth/AuthPopover"
import ProfilePopover from "./ProfilePopover"
import useAuth from "@/hooks/useAuth"
import MobileNavProfile from "./MobileNavProfile"
import AuthModal from "./auth/AuthModal"

export default function Nav() {
	const [nav, setNav] = useState(false)
	const [showSignIn, setShowSignIn] = useState(true)
	const { user } = useAuth()
	const activeStyles =
		"border-b-2 border-black font-semibold py-1 hover:text-secondaryAccent hover:border-b-2 hover:border-secondaryAccent"

	const handleNav = () => {
		setNav(!nav)
	}

	// useEffect(() => {
	// 	document.body.style.overflow = nav ? "hidden" : "unset"
	// 	document.documentElement.style.overflow = nav ? "hidden" : "unset"
	// }, [nav])

	// useEffect(() => {
	// 	const handleResize = () => {
	// 		const newWidth = window.innerWidth
	// 		if (newWidth >= 768) {
	// 			setNav(false)
	// 		}
	// 	}

	// 	window.addEventListener("resize", handleResize)

	// 	return () => {
	// 		window.removeEventListener("resize", handleResize)
	// 	}
	// }, [])

	return (
		<nav className="fixed w-full bg-[#fff7ed] h-20 px-10 z-50">
			<div className="flex justify-between items-center h-full w-full">
				<Link
					onClick={() => setNav(false)}
					to="/"
					className="text-primaryText text-2xl font-bold uppercase"
				>
					#VanLife
				</Link>
				<ul className="hidden md:flex gap-10 text-primaryText">
					<li>
						<NavLink
							to="vans"
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
							className={({ isActive }) =>
								isActive
									? activeStyles
									: "hover:text-secondaryAccent hover:border-b-2 border-secondaryAccent py-1"
							}
						>
							Host
						</NavLink>
					</li>
					<li>
						{user ? (
							<ProfilePopover />
						) : (
							<AuthPopover
								showSignIn={showSignIn}
								setShowSignIn={setShowSignIn}
							/>
						)}
					</li>
				</ul>
				<button
					onClick={handleNav}
					aria-label="Open menu"
					className="md:hidden"
				>
					{nav ? <AiOutlineClose size={30} /> : <BiMenu size={30} />}
				</button>
			</div>

			{/* Mobile nav */}
			<div className={nav ? "md:hidden" : ""}>
				<div
					className={`fixed top-20 h-screen p-10 ${
						nav
							? "right-0 w-[300px] duration-300 bg-[#fff7ed]"
							: "right-[-100%] duration-500"
					}`}
				>
					<div>
						{user ? (
							<MobileNavProfile />
						) : (
							<AuthModal
								showSignIn={showSignIn}
								setShowSignIn={setShowSignIn}
							/>
						)}
					</div>
					<div className="py-6">
						<h3 className="border-b border-gray-300 text-lg">
							Main navigation
						</h3>
						<ul className="flex flex-col gap-4 mt-4">
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
		</nav>
	)
}
