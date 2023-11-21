import { NavLink, Outlet } from "react-router-dom"

export default function HostLayout() {
	const activeStyles =
		"border-b-2 border-black font-semibold py-1 hover:text-secondaryAccent hover:border-b-2 hover:border-secondaryAccent"
	return (
		<>
			<nav className="w-full max-w-[1240px] mx-auto pt-24 px-8">
				<ul className="flex flex-col xs:flex-row items-center gap-5">
					<li>
						<NavLink
							to="."
							end
							className={({ isActive }) =>
								isActive
									? activeStyles
									: "hover:text-secondaryAccent hover:border-b-2 border-secondaryAccent py-1"
							}
						>
							Dashboard
						</NavLink>
					</li>
					<li>
						<NavLink
							to="income"
							className={({ isActive }) =>
								isActive
									? activeStyles
									: "hover:text-secondaryAccent hover:border-b-2 border-secondaryAccent py-1"
							}
						>
							Income
						</NavLink>
					</li>
					<li>
						{" "}
						<NavLink
							to="vans"
							className={({ isActive }) =>
								isActive
									? activeStyles
									: "hover:text-secondaryAccent hover:border-b-2 border-secondaryAccent py-1"
							}
						>
							Vans
						</NavLink>
					</li>
					<li>
						<NavLink
							to="reviews"
							className={({ isActive }) =>
								isActive
									? activeStyles
									: "hover:text-secondaryAccent hover:border-b-2 border-secondaryAccent py-1"
							}
						>
							Reviews
						</NavLink>
					</li>
				</ul>
			</nav>
			<Outlet />
		</>
	)
}
