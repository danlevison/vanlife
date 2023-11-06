import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// types
import { VanType } from "@/types/vanType"

type VanCardProps = {
	van: VanType
	vanTypeColour: Record<string, string>
}

export default function VanCard({ van, vanTypeColour }: VanCardProps) {
	return (
		<Link to={van.vanId}>
			<Card>
				<img
					src={van.imageURL}
					alt={`Photo of ${van.name} campervan`}
					className="rounded-t-lg"
					style={{ objectFit: "cover" }}
				/>
				<div className="flex justify-between font-bold text-primaryText text-xl px-2 py-3">
					<CardTitle className="text-xl">{van.name}</CardTitle>
					<CardContent className="p-0">
						<p>
							£{van.price}
							<span className="font-normal text-lg">/night</span>
						</p>
					</CardContent>
				</div>
				<CardFooter className="flex justify-end p-2">
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