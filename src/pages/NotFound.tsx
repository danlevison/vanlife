import { Link } from "react-router-dom"

export default function NotFound() {
	return (
		<div className="flex flex-col justify-center items-center min-h-screen max-w-[1240px] mx-auto px-8 text-center">
			<h1 className="text-5xl sm:text-6xl md:text-7xl">404</h1>
			<h2 className="text-3xl sm:text-4xl md:text-5xl pt-4 pb-10">
				Sorry, the page you were looking for was not found.
			</h2>
			<Link
				to="/"
				className="bg-[#161616] text-white font-bold py-3 px-6 rounded-md"
			>
				Return to home
			</Link>
		</div>
	)
}
