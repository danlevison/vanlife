import { Link } from "react-router-dom"

export default function Home() {
	return (
		<div className="relative flex justify-center items-center min-h-screen bg-[url('./assets/hero-bg-img.jpg')] bg-cover bg-no-repeat bg-center px-10">
			<div className="absolute inset-0 bg-black/60" />
			<div className="relative flex flex-col justify-center items-center max-w-[1440px] text-white text-center">
				<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
					You got the travel plans, we got the travel vans.
				</h1>
				<p className="py-6 text-lg sm:text-xl">
					Add adventure to your life by joining the #vanlife movement. Rent the
					perfect van to make your perfect road trip.
				</p>
				<Link
					to="vans"
					className="bg-[#FF8C38] border border-black rounded-md p-2 w-full sm:w-[300px] text-center text-lg font-bold"
				>
					Find your van
				</Link>
			</div>
		</div>
	)
}
