import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { PiCaretDownLight } from "react-icons/pi"
//types
import { VanType } from "@/types/vanType"

export default function HostVanInfo() {
	const { van }: { van: VanType } = useOutletContext()

	const [showMore, setShowMore] = useState(false)
	const displayedDescription = !showMore
		? van.vehicle_description.slice(0, 1)
		: van.vehicle_description

	return (
		<section className="host-van-detail-info">
			<h4>
				Name: <span className="font-normal">{van.name}</span>
			</h4>
			<h4 className="py-4">
				Category: <span className="font-normal">{van.type}</span>
			</h4>
			<h4>
				Description:{" "}
				<span className="font-normal">
					{displayedDescription.map((item) => (
						<p
							key={item}
							className="pb-5 max-w-[700px]"
						>
							{item}
						</p>
					))}
				</span>
			</h4>
			<button
				onClick={() => setShowMore(!showMore)}
				className="text-accent flex gap-1 hover:bg-[#FFEAD0] p-2 rounded-lg"
			>
				{showMore ? "Show less" : "Show more"}
				<span>
					<PiCaretDownLight size={23} />
				</span>
			</button>
			<h4 className="pt-4">
				Visibility: <span className="font-normal">Public</span>
			</h4>
		</section>
	)
}
