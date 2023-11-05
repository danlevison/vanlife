import { BsStars, BsTelephoneOutbound } from "react-icons/bs"
import { BiPaperPlane } from "react-icons/bi"
import { PiCoinsBold } from "react-icons/pi"

export default function SellingPointsGrid() {
	const sellingPoints = [
		{
			icon: (
				<BsStars
					size={40}
					className="text-secondaryAccent"
				/>
			),
			heading: "Flexible cancellation up to 72h prior to your journey",
			description:
				"Cancel your trip for a full refund up to 20 days or opt for an 85% value voucher up to 72h before your pick-up date!"
		},
		{
			icon: (
				<BiPaperPlane
					size={40}
					className="text-secondaryAccent"
				/>
			),
			heading: "One-way trips are available",
			description:
				"Collect and return your campervan at over 70 locations spanning North America, Europe, and Oceania."
		},
		{
			icon: (
				<BsTelephoneOutbound
					size={40}
					className="text-secondaryAccent"
				/>
			),
			heading: "RAC Breakdown Cover",
			description:
				"Our collaboration with RAC ensures 24/7 nationwide breakdown coverage to ensure your adventure stays on course."
		},
		{
			icon: (
				<PiCoinsBold
					size={40}
					className="text-secondaryAccent"
				/>
			),
			heading: "Book now, pay later!",
			description:
				"With our highly flexible cancellation policy for campervans, you're only required to pay the complete booking amount 20 days before your trip begins."
		}
	]
	return (
		<section className="flex flex-col justify-center items-center max-w-[1440px] mx-auto py-20 px-8">
			<h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center pb-12">
				The leading road trip service in North America, Oceania, and Europe
			</h2>
			<ul className="grid grid-cols-1 md:grid-cols-4 gap-10 w-full">
				{sellingPoints.map((point) => (
					<li
						key={point.heading}
						className="flex items-center md:flex-col md:items-start gap-2 md:gap-0 md:max-w-[250px]"
					>
						<div>{point.icon}</div>
						<div>
							<h3 className="md:text-lg font-bold py-2">{point.heading}</h3>
							<p className="text-sm md:text-base">{point.description}</p>
						</div>
					</li>
				))}
			</ul>
		</section>
	)
}
