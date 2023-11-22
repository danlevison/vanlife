import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuth from "@/hooks/useAuth"
import Nav from "../header/Nav"

export default function AuthRequired() {
	const { user } = useAuth()
	const location = useLocation()

	if (!user) {
		return (
			<Navigate
				to="sign-in"
				replace
				state={{ from: location }}
			/>
		)
	}

	return (
		<div>
			<header>
				<Nav />
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	)
}
