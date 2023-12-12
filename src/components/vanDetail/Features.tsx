import { BsTelephoneOutbound } from "react-icons/bs"
import { GiCooler } from "react-icons/gi"
import { BsLadder } from "react-icons/bs"
import {
	PiRadioLight,
	PiTentLight,
	PiShower,
	PiVideoCameraLight
} from "react-icons/pi"
import { FaVest } from "react-icons/fa"
import { TbToolsKitchen2, TbCooker } from "react-icons/tb"
import { GiGearStickPattern, GiWaterTank } from "react-icons/gi"
import FeaturesModal from "./FeaturesModal"
// types
import { VanType } from "@/types/vanType"

type FeaturesProps = {
	van: VanType
}

type FeaturesIconsType = {
	[key: string]: JSX.Element
}

export default function Features({ van }: FeaturesProps) {
	const featuresIcons: FeaturesIconsType = {
		Cooler: <GiCooler size={40} />,
		"Fridge (84L)": <GiCooler size={40} />,
		"Water tank": <GiWaterTank size={40} />,
		"Collapsible ladder": <BsLadder size={40} />,
		"Radio with AUX and USB": <PiRadioLight size={40} />,
		"Car jack, triangle & vests": <FaVest size={40} />,
		"Gas stove": <TbCooker size={40} />,
		"Kitchen kit": <TbToolsKitchen2 size={40} />,
		"Portable gas cooker": <TbCooker size={40} />,
		Automatic: <GiGearStickPattern size={40} />,
		"Rooftop tent": <PiTentLight size={40} />,
		"Exterior shower": <PiShower size={40} />,
		"Exterior wash station": <PiShower size={40} />,
		"Rear-view camera": <PiVideoCameraLight size={40} />,
		"24/7 assistance": <BsTelephoneOutbound size={35} />,
		"Mosquito net": <PiVideoCameraLight size={40} />,
		"Interior dining table": <PiVideoCameraLight size={40} />,
		Heater: <PiVideoCameraLight size={40} />,
		"LP, smoke, and carbon monoxide detectors": (
			<PiVideoCameraLight size={40} />
		),
		"Cleaning kit": <PiVideoCameraLight size={40} />
	}

	const displayedFeatures = van.features.slice(0, 6)

	return (
		<div className="py-5 border-b border-gray-300 w-full">
			<h4 className="font-bold text-xl">Included features</h4>
			<ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 pt-5">
				{displayedFeatures.map((feature) => (
					<li
						key={feature}
						className="flex items-center gap-4"
					>
						{featuresIcons[feature]}
						{feature}
					</li>
				))}
			</ul>
			<FeaturesModal van={van} />
		</div>
	)
}
