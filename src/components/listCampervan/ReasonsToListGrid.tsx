import { BsStars } from "react-icons/bs"
import { PiCoinsBold, PiSteeringWheel } from "react-icons/pi"

export default function ReasonsToListGrid() {
	const reasonsToList = [
		{
			icon: (
				<PiSteeringWheel
					size={40}
					className="text-secondaryAccent"
				/>
			),
			heading: "You are in the drivers seat",
			description:
				"You have the flexibility to manage your own rates, adjust for seasonality, and choose when and to whom you wish to rent your campervan."
		},
		{
			icon: (
				<PiCoinsBold
					size={40}
					className="text-secondaryAccent"
				/>
			),
			heading: "Earn extra income",
			description:
				"Generate extra income to boost your savings or finance your dream adventure. You might even kickstart a new side-business."
		},
		{
			icon: (
				<BsStars
					size={40}
					className="text-secondaryAccent"
				/>
			),
			heading: "Trusted by 100k+ customers",
			description:
				"Become part of a platform renowned for its top customer satisfaction, boasting a 4.5/5.0 star rating on Trustpilot and other reputable platforms."
		}
	]
	return (
		<section className="flex flex-col pt-10 md:pt-24">
			<h2 className="text-xl sm:text-2xl pb-6">
				Why should I rent out my campervan with #VANLIFE?
			</h2>
			<ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-24 w-full">
				{reasonsToList.map((point) => (
					<li
						key={point.heading}
						className="flex items-center md:flex-col md:items-start gap-2 md:gap-0 md:max-w-[350px]"
					>
						<div>{point.icon}</div>
						<div>
							<h3 className="md:text-lg py-2">{point.heading}</h3>
							<p className="text-sm md:text-base">{point.description}</p>
						</div>
					</li>
				))}
			</ul>
		</section>
	)
}
