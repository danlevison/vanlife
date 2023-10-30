import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Nav from "./Nav"
export default function Layout() {
	return (
		<div className="flex flex-col min-h-screen">
			<header>
				<Nav />
			</header>
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}
