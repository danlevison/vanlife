import { Link } from "react-router-dom"

export default function HowToList() {
	const reasonsToList = [
		{
			instruction: 1,
			heading: "Create your listing on your terms",
			description:
				"Rent out your campervan for free and edit your listing by filling in your preferences, your nightly rates and the availability."
		},
		{
			instruction: 2,
			heading: "Accept new bookings",
			description:
				"Once your vehicle is listed, booking requests will start to come in. Accept requests to start earning."
		},
		{
			instruction: 3,
			heading: "Rent out your campervan and start earning",
			description:
				"Meet and greet your clients - look up your travellers' details, agree on a pick-up time and sign the contract."
		}
	]
	return (
		<section className="flex flex-col pt-10 md:pt-32">
			<h2 className="text-xl sm:text-2xl pb-6">
				How to rent out my campervan?
			</h2>
			<ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-24 w-full">
				{reasonsToList.map((point) => (
					<li
						key={point.heading}
						className="flex flex-col gap-2 md:gap-0 md:max-w-[350px]"
					>
						<div className="flex justify-center items-center border border-black rounded-full w-16 h-16 ">
							<p className="text-3xl text-center">{point.instruction}</p>
						</div>

						<div>
							<h3 className="md:text-lg py-2">{point.heading}</h3>
							<p className="text-sm md:text-base">{point.description}</p>
						</div>
					</li>
				))}
			</ul>
			<div className="flex justify-center items-center">
				<Link
					to="/host"
					className="mt-5 sm:mt-10 py-3 px-6 bg-accent rounded-md text-white hover:bg-accent/80 duration-300"
				>
					List my van
				</Link>
			</div>
		</section>
	)
}
