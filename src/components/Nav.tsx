import { useState, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import { BiMenu } from "react-icons/bi"
import { AiOutlineClose } from "react-icons/ai"

export default function Nav() {
	const [nav, setNav] = useState(false)
	const activeStyles = "underline font-semibold"

	const handleNav = () => {
		setNav(!nav)
	}

	useEffect(() => {
		document.body.style.overflow = nav ? "hidden" : "unset"
		document.documentElement.style.overflow = nav ? "hidden" : "unset"
	}, [nav])

	useEffect(() => {
		const handleResize = () => {
			const newWidth = window.innerWidth
			if (newWidth >= 768) {
				setNav(false)
			}
		}

		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	return (
		<nav className="fixed w-full bg-[#fff7ed] h-20 px-10 z-50">
			<div className="flex justify-between items-center h-full w-full">
				<Link
					onClick={() => setNav(false)}
					to="/"
					className="text-2xl font-bold uppercase"
				>
					#VanLife
				</Link>
				<ul className="hidden md:flex gap-10 text-primaryText">
					<li>
						<NavLink
							to="vans"
							className={({ isActive }) => (isActive ? activeStyles : "")}
						>
							Our Vans
						</NavLink>
					</li>
					<li>
						<NavLink
							to="about"
							className={({ isActive }) => (isActive ? activeStyles : "")}
						>
							About
						</NavLink>
					</li>
					<li>
						<NavLink
							to="host"
							className={({ isActive }) => (isActive ? activeStyles : "")}
						>
							Host
						</NavLink>
					</li>
					<li>
						<NavLink
							to="host"
							className={({ isActive }) => (isActive ? activeStyles : "")}
						>
							Sign In
						</NavLink>
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
					className={`fixed top-20 h-screen text-center p-10 ${
						nav ? "left-0 w-full bg-[#fff7ed] text-center" : "left-[-100%]"
					}`}
				>
					<ul className="flex flex-col gap-16 text-lg text-primaryText">
						<li>
							<NavLink
								to="vans"
								onClick={handleNav}
								className={({ isActive }) => (isActive ? activeStyles : "")}
							>
								Our Vans
							</NavLink>
						</li>
						<li>
							<NavLink
								to="about"
								onClick={handleNav}
								className={({ isActive }) => (isActive ? activeStyles : "")}
							>
								About
							</NavLink>
						</li>
						<li>
							<NavLink
								to="host"
								onClick={handleNav}
								className={({ isActive }) => (isActive ? activeStyles : "")}
							>
								Host
							</NavLink>
						</li>
						<li>
							<NavLink
								to="sign-in"
								onClick={handleNav}
								className={({ isActive }) => (isActive ? activeStyles : "")}
							>
								Sign In
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}
