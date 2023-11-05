import { useState } from "react"
import { PiCaretDownLight } from "react-icons/pi"
//types
import { VanType } from "../../types/vanType"

type DescriptionProps = {
	van: VanType
}

export default function Description({ van }: DescriptionProps) {
	const [showMore, setShowMore] = useState(false)
	const displayedDescription = !showMore
		? van.vehicle_description.slice(0, 1)
		: van.vehicle_description

	return (
		<div className="py-5 border-y border-gray-300">
			<h4 className="font-bold text-xl">Vehicle description</h4>
			<div className="pt-5 md:max-w-[600px] leading-relaxed">
				{displayedDescription.map((item) => (
					<p
						key={item}
						className="pb-5"
					>
						{item}
					</p>
				))}
				<button
					onClick={() => setShowMore(!showMore)}
					className="text-primaryAccent flex gap-1 hover:bg-[#FFEAD0] p-2 rounded-lg"
				>
					{showMore ? "Show less" : "Show more"}
					<span>
						<PiCaretDownLight size={23} />
					</span>
				</button>
			</div>
		</div>
	)
}
