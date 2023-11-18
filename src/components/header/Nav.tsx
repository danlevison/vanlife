import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"
import AuthPopover from "../auth/AuthPopover"
import ProfilePopover from "./ProfilePopover"
import useAuth from "@/hooks/useAuth"
import Logo from "./Logo"
import MobileNavMenu from "./MobileNavMenu"
import MobileMenuOpenBtn from "./MobileMenuOpenBtn"

export default function Nav() {
	const { user } = useAuth()
	const [nav, setNav] = useState(false)
	const [scrollY, setScrollY] = useState(0)
	const location = useLocation()
	const pathname = location.pathname
	const activeStyles =
		"border-b-2 border-black font-semibold py-1 hover:text-secondaryAccent hover:border-b-2 hover:border-secondaryAccent"

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY)
		}

		window.addEventListener("scroll", handleScroll)

		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [scrollY])

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
		<nav
			className={`fixed w-full bg-[#fff7ed] h-20 px-10 z-50 duration-300 ${
				scrollY > 0 ||
				pathname === "/user" ||
				pathname === "/user/details" ||
				pathname === "/user/security-login"
					? "shadow-md"
					: ""
			} `}
		>
			<div className="flex justify-between items-center h-full w-full">
				<Logo setNav={setNav} />
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
							to="list-my-campervan"
							className={({ isActive }) =>
								isActive
									? activeStyles
									: "hover:text-secondaryAccent hover:border-b-2 border-secondaryAccent py-1"
							}
						>
							List your van
						</NavLink>
					</li>
					<li>{user ? <ProfilePopover /> : <AuthPopover />}</li>
				</ul>
				<MobileMenuOpenBtn handleNav={handleNav} />
			</div>

			<MobileNavMenu
				handleNav={handleNav}
				nav={nav}
				activeStyles={activeStyles}
			/>
		</nav>
	)
}
