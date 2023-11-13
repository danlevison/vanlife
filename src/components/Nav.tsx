import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { BiMenu } from "react-icons/bi"
import { GoPencil } from "react-icons/go"
import { AiOutlineClose, AiOutlineUser } from "react-icons/ai"
import { VscAccount } from "react-icons/vsc"
import { CiLogin, CiLogout } from "react-icons/ci"
import AuthPopover from "./auth/AuthPopover"
import ProfilePopover from "./ProfilePopover"
import useAuth from "@/hooks/useAuth"
import { Button } from "./ui/button"

export default function Nav() {
	const [nav, setNav] = useState(false)
	const { user, signOut } = useAuth()
	const activeStyles =
		"border-b-2 border-black font-semibold py-1 hover:text-secondaryAccent hover:border-b-2 hover:border-secondaryAccent"

	const handleNav = () => {
		setNav(!nav)
	}

	console.log(user)

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
		<>
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
						<li>{user ? <ProfilePopover /> : <AuthPopover />}</li>
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
							nav ? "right-0 w-[300px] bg-[#fff7ed]" : "right-[-100%]"
						}`}
					>
						<div>
							{user ? (
								<>
									<div className="flex flex-col gap-4">
										<div className="flex items-center gap-6">
											<VscAccount size={30} />
											<div>
												<h3 className="text-lg">
													{user.user_metadata.first_name}
												</h3>
												<p className="text-sm">{user.email}</p>
											</div>
										</div>

										<ul className="text-base">
											<li className="py-2">
												<Link
													to=""
													className="flex items-center gap-6 hover:text-accent duration-150"
												>
													<AiOutlineUser size={25} />
													<p>My profile</p>
												</Link>
											</li>
											<li className="py-4">
												<Link
													to=""
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
								</>
							) : (
								<AuthPopover />
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
		</>
	)
}
