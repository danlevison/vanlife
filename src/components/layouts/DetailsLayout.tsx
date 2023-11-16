import { Outlet, NavLink } from "react-router-dom"

export default function DetailsLayout() {
	const activeStyles =
		"font-bold bg-[#F2F2F2] border-b sm:border-b-0 sm:border-r border-black p-5 sm:rounded-l-lg"

	return (
		<div className="flex flex-col sm:flex-row justify-between px-10 py-32 sm:py-36 max-w-[1440px] mx-auto">
			<nav className="flex flex-row sm:flex-col border-b sm:border-b-0 sm:border-r w-full sm:w-[300px] mb-5 sm:mb-0 sm:mr-7">
				<NavLink
					to="user/details"
					end
					className={({ isActive }) =>
						isActive
							? activeStyles
							: "hover:bg-[#F2F2F2] hover:border-b sm:hover:border-b-0  sm:hover:border-r border-black p-5 sm:rounded-l-lg"
					}
				>
					Account details
				</NavLink>

				<NavLink
					to="user/security-login"
					className={({ isActive }) =>
						isActive
							? activeStyles
							: "hover:bg-[#F2F2F2] hover:border-b sm:hover:border-b-0 sm:hover:border-r border-black p-5 sm:rounded-l-lg"
					}
				>
					Security & Login
				</NavLink>
			</nav>
			<Outlet />
		</div>
	)
}
