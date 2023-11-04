import { BsPersonFill } from "react-icons/bs"
import { LiaBedSolid } from "react-icons/lia"
import { MdOutlineKitchen } from "react-icons/md"
import { PiShower, PiTentLight } from "react-icons/pi"
import { GiGearStickPattern } from "react-icons/gi"
// types
import { VanType } from "../../types/vanType"

type OverviewProps = {
	van: VanType
}

type OverviewIconsType = {
	[key: string]: JSX.Element
}

export default function Overview({ van }: OverviewProps) {
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
		<div className="py-5">
			<ul className="flex flex-wrap justify-between items-center gap-4 pt-5 md:max-w-[600px]">
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
