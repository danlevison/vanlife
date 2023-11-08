import { Link, useSearchParams } from "react-router-dom"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AiFillStar } from "react-icons/ai"
// types
import { VanType } from "@/types/vanType"
import SkeletonCard from "../ui/SkeletonCard"

type VanCardProps = {
	van: VanType
	vanTypeColour: Record<string, string>
	loading: boolean
	imageLoading: boolean
}

export default function VanCard({
	van,
	vanTypeColour,
	loading,
	imageLoading
}: VanCardProps) {
	const [searchParams] = useSearchParams()

	return loading || imageLoading ? (
		<SkeletonCard />
	) : (
		<Link
			to={van.vanId}
			state={{ search: `?${searchParams.toString()}` }}
		>
			<Card className="text-primaryText min-h-[312px]">
				<div className="h-full">
					<img
						src={van.imageURL}
						alt={`Photo of ${van.name} campervan`}
						loading="lazy"
						className="rounded-t-lg h-full min-h-[312px]"
						style={{ objectFit: "cover" }}
					/>
				</div>
				<div className="flex justify-between font-bold text-xl px-2 py-3">
					<CardTitle className="text-xl">{van.name}</CardTitle>
					<CardContent className="p-0">
						<p>
							£{van.price}
							<span className="font-normal text-lg">/night</span>
						</p>
					</CardContent>
				</div>
				<CardFooter className="flex justify-between p-2">
					<div className="flex items-center gap-1">
						<p className="text-lg">{van.rating}</p>
						<AiFillStar
							size={20}
							className="text-yellow-500"
						/>
					</div>

					<Badge
						className={`px-3 py-2 text-[#FFEAD0] rounded-lg font-semibold ${
							vanTypeColour[van.type.toLowerCase()] || "#00000"
						}`}
					>
						{van.type}
					</Badge>
				</CardFooter>
			</Card>
		</Link>
	)
}
