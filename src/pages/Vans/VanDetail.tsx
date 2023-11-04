import { useContext, useEffect, useState } from "react"
import VansDataContext from "../../context/VansDataContext"
import { useParams, Link } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs"
import Overview from "../../components/vanDetail/Overview"
import ImageHeader from "../../components/vanDetail/ImageHeader"
//types
import { VanType } from "../../types/vanType"
import Description from "../../components/vanDetail/Description"
import Features from "../../components/vanDetail/Features"
import Details from "../../components/vanDetail/Details"
import Rules from "../../components/vanDetail/Rules"
import CheckAvailability from "../../components/vanDetail/CheckAvailability"
import Cancellation from "../../components/vanDetail/Cancellation"

export default function VanDetail() {
	const { vans } = useContext(VansDataContext)
	const [van, setVan] = useState<VanType | null>(null)
	const { id } = useParams()

	const vanTypeColour = {
		simple: "bg-[#E17654]",
		rugged: "bg-[#115E59]",
		luxury: "bg-[#161616]"
	} as Record<string, string>

	const getVan = (vanId: string) => {
		const vanDetail = vans?.find((van) => van.vanId === vanId)
		setVan(vanDetail ?? null)
	}

	useEffect(() => {
		if (id) {
			getVan(id)
		}
	}, [])

	return (
		<div className="min-h-screen mx-auto px-8 py-20">
			<div className="flex items-center gap-2 pb-2">
				<Link
					to={".."}
					relative="path"
					className="order-1 underline"
				>
					Back to all vans
				</Link>
				<BsArrowLeft />
			</div>

			{van !== null && <ImageHeader van={van} />}

			{van && (
				<div className="w-full max-w-[1240px] mx-auto py-8">
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primaryText">
						{van.name}
					</h1>
					<div className="flex flex-col md:flex-row justify-between items-start gap-10">
						<div className="w-full pt-10">
							<i
								className={`px-3 py-2 text-[#FFEAD0] rounded-lg font-semibold ${
									vanTypeColour[van.type.toLowerCase()] || "#00000"
								}`}
							>
								{van.type}
							</i>
							<Overview van={van} />
							<Description van={van} />
							<Features van={van} />
							<Details van={van} />
							<Rules van={van} />
							<Cancellation />
						</div>
						<CheckAvailability van={van} />
					</div>
				</div>
			)}
		</div>
	)
}
