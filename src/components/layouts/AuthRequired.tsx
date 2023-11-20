import { Navigate, Outlet } from "react-router-dom"
import useAuth from "@/hooks/useAuth"
import Nav from "../header/Nav"

export default function AuthRequired() {
	const { user } = useAuth()

	if (!user) {
		return <Navigate to="/" />
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
