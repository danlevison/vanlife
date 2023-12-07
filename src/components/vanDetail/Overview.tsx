import { BsPersonFill } from "react-icons/bs"
import { LiaBedSolid } from "react-icons/lia"
import { MdOutlineKitchen } from "react-icons/md"
import { PiShower, PiTentLight } from "react-icons/pi"
import { GiGearStickPattern } from "react-icons/gi"
import { Badge } from "@/components/ui/badge"
// types
import { VanType } from "../../types/vanType"

type OverviewProps = {
	van: VanType
}

type OverviewIconsType = {
	[key: string]: JSX.Element
}

export default function Overview({ van }: OverviewProps) {
	const vanTypeColour = {
		simple: "bg-[#E17654]",
		rugged: "bg-[#115E59]",
		luxury: "bg-[#161616]"
	} as Record<string, string>

	const overviewIcons: OverviewIconsType = {
		"4 seats": <BsPersonFill size={40} />,
		"5 seats": <BsPersonFill size={40} />,
		"Sleeps 2": <LiaBedSolid size={40} />,
		"Sleeps 4": <LiaBedSolid size={40} />,
		Kitchen: <MdOutlineKitchen size={40} />,
		"Exterior shower": <PiShower size={40} />,
		Automatic: <GiGearStickPattern size={40} />,
		Manual: <GiGearStickPattern size={40} />,
		"Rooftop tent": <PiTentLight size={40} />
	}
	return (
		<div className="flex flex-col gap-6 items-start w-full border-b border-gray-300 py-5">
			<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primaryText">
				{van.name}
			</h1>
			<Badge
				className={`px-3 py-2 text-[#FFEAD0] rounded-lg font-semibold text-base ${
					vanTypeColour[van.type.toLowerCase()] || "#00000"
				}`}
			>
				{van.type}
			</Badge>
			<ul className="flex flex-wrap justify-between items-center gap-4 w-full">
				{van.overview.map((item) => (
					<li
						key={item}
						className="flex flex-col items-center gap-1"
					>
						{overviewIcons[item]}
						{item}
					</li>
				))}
			</ul>
		</div>
	)
}
