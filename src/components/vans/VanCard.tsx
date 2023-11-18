import { Link, useSearchParams } from "react-router-dom"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AiFillStar } from "react-icons/ai"
import { PiPawPrint } from "react-icons/pi"
import { MdOutlineFestival } from "react-icons/md"
// types
import { VanType } from "@/types/vanType"

type VanCardProps = {
	van: VanType
	vanTypeColour: Record<string, string>
}

export default function VanCard({ van, vanTypeColour }: VanCardProps) {
	const [searchParams] = useSearchParams()

	const ruleIcons = (rules: string[]) => {
		return rules.map((rule, idx) => {
			switch (rule) {
				case "Pet Friendly":
					return (
						<PiPawPrint
							key={idx}
							size={25}
						/>
					)
				case "Festival Friendly":
					return (
						<MdOutlineFestival
							key={idx}
							size={25}
						/>
					)
				default:
					return null
			}
		})
	}

	return (
		<Link
			to={van.vanId}
			state={{ search: `?${searchParams.toString()}` }}
		>
			<Card className="text-primaryText min-h-[312px]">
				<img
					src={van.imageURL}
					alt={`Photo of ${van.name} campervan`}
					loading="lazy"
					className="rounded-t-lg min-h-[312px]"
					style={{ objectFit: "cover" }}
				/>

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
					<div className="flex items-center gap-2">
						{ruleIcons(van.vehicle_rules)}
						<Badge
							className={`px-3 py-2 text-[#FFEAD0] rounded-lg font-semibold ${
								vanTypeColour[van.type.toLowerCase()] || "#00000"
							}`}
						>
							{van.type}
						</Badge>
					</div>
				</CardFooter>
			</Card>
		</Link>
	)
}
