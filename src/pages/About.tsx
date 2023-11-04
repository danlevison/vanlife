import { Link } from "react-router-dom"
import campervanImg from "../assets/about-img.jpg"

export default function About() {
	return (
		<div className="lg:grid grid-cols-2 justify-center items-center min-h-screen">
			<img
				src={campervanImg}
				alt="Photo of a campervan next to a lake at sunset"
				className="order-1 w-full h-[500px] lg:h-full"
				style={{
					objectFit: "cover",
					objectPosition: "center"
				}}
			/>
			<div className="lg:pt-12">
				<div className="max-w-[1240px] px-8 text-primaryText">
					<h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold py-8">
						Don’t squeeze in a sedan when you could relax in a van.
					</h1>
					<p className="mb-6 sm:text-lg leading-snug">
						Our mission is to enliven your road trip with the perfect travel van
						rental. Our vans are recertified before each trip to ensure your
						travel plans can go off without a hitch. (Hitch costs extra 😉)
					</p>
					<p className="sm:text-lg leading-snug">
						Our team is full of vanlife enthusiasts who know first-hand the
						magic of touring the world on 4 wheels.
					</p>
				</div>
				<div className="flex flex-col gap-6 lg:max-w-[600px] bg-[#FFCC8D] rounded-md p-6 m-10 text-primaryText font-bold">
					<h2 className="text-2xl sm:text-3xl md:text-4xl">
						Your destination is waiting.
						<br />
						Your van is ready.
					</h2>
					<Link
						className="w-full sm:w-44 bg-primaryText rounded-xl p-3 text-white text-center"
						to="/vans"
					>
						Explore our vans
					</Link>
				</div>
			</div>
		</div>
	)
}
