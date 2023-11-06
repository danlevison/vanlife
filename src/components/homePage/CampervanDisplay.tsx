import { Link } from "react-router-dom"
import campervan from "@/assets/campervan-home.jpg"
import people from "@/assets/people-campervan.jpg"

export default function CampervanDisplay() {
	return (
		<section className="max-w-[1440px] mx-auto md:py-10 px-8">
			<div className="flex flex-col lg:flex-row justify-between items-center gap-2 md:gap-10 shadow-lg rounded-lg lg:shadow-none lg:rounded-none lg:p-0">
				<div className="order-1 flex flex-col justify-center lg:max-w-[600px] p-4 lg:p-0">
					<h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
						Check out all of the Vanlife models!
					</h2>
					<p className="pt-4 pb-10">
						Explore our range of Vanlife Camper models and locate your ideal
						travel home that fulfills all your desires and turns your travel
						dreams into reality. We provide a varied assortment of campervans
						from well-known manufacturers such as Knaus, Fiat, VW, and many
						others.
					</p>
					<Link
						to="vans"
						className="bg-accent rounded-md p-3 w-full text-center text-white text-lg font-bold hover:opacity-70 duration-300"
					>
						Find your van
					</Link>
				</div>
				<div>
					<img
						src={campervan}
						alt="Photo of a campervan in the forest"
						className="w-full lg:max-w-[600px] rounded-t-lg lg:rounded-lg"
						style={{ objectFit: "cover" }}
					/>
				</div>
			</div>

			<div className="flex flex-col lg:flex-row justify-between items-center gap-2 md:gap-10 shadow-lg rounded-lg lg:shadow-none lg:rounded-none lg:p-0 mt-16 mb-4 md:mb-0">
				<div className="order-1 lg:order-[0] flex flex-col justify-center lg:max-w-[600px] p-4 lg:p-0">
					<h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
						Do you own a campervan in Europe? Generate more than £25,000
						annually
					</h2>
					<p className="pt-4 pb-10">
						Have you thought about generating income during the times when your
						campervan is not in use? Register your vehicle for free and make it
						available for rent whenever you choose.
					</p>
					<Link
						to="vans"
						className="bg-accent rounded-md p-3 w-full text-center text-white text-lg font-bold hover:opacity-70 duration-300"
					>
						Rent out my campervan
					</Link>
				</div>
				<div>
					<img
						src={people}
						alt="Photo of a campervan in the forest"
						className="w-full lg:max-w-[600px] rounded-t-lg lg:rounded-lg"
						style={{ objectFit: "cover" }}
					/>
				</div>
			</div>
		</section>
	)
}
