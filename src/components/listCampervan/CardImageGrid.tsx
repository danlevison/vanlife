import { Link } from "react-router-dom"
import listCampervanImg from "@/assets/list-campervan-img.jpg"

export default function CardImageGrid() {
	return (
		<section className="flex flex-col justify-center items-center md:grid grid-cols-10">
			<div className="row-span-full col-span-6 col-end-6 self-center h-[450px] w-full md:max-w-[450px] bg-white p-8 rounded-t-lg md:rounded-lg shadow-md">
				<h1 className="text-2xl sm:text-3xl">Rent out my campervan</h1>
				<p className="pt-2">
					Limited-Time Special! - Kickstart your Vanlife journey by listing your
					van today and enjoy your first two bookings completely
					commission-free!
				</p>
				<div className="flex flex-col pt-5">
					<div>
						<p className="text-gray-500">Earn up to</p>
						<h2 className="text-xl sm:text-2xl md:text-3xl">
							£30,000{" "}
							<span className="font-normal text-sm text-gray-500">
								per year
							</span>
						</h2>
						<p className="text-gray-500 text-sm italic">
							Estimate based on forecasted nightly prices and occupancy rates
							throughout the year.
						</p>
					</div>
				</div>
				<div className="flex flex-grow justify-center border-b border-gray-300 pb-5">
					<Link
						to="/host"
						className="mt-5 sm:mt-10 py-3 px-6 bg-accent rounded-md text-white hover:bg-accent/80 duration-300"
					>
						Start listing
					</Link>
				</div>
			</div>

			<div className="md:order-[-1] row-span-full col-start-4 col-span-10 self-center">
				<img
					src={listCampervanImg}
					alt="Photo of a campervan next to a lake at sunset"
					className="rounded-b-lg md:rounded-lg w-full md:h-[500px] shadow-md md:shadow-none"
					style={{
						objectFit: "cover",
						objectPosition: "center"
					}}
				/>
			</div>
		</section>
	)
}
