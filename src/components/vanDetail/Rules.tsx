import { BsPersonVcard } from "react-icons/bs"
import { PiPawPrint } from "react-icons/pi"
import { GiMusicalNotes } from "react-icons/gi"
// types
import { VanType } from "../../types/vanType"

type RulesProps = {
	van: VanType
}

type RulesIconsType = {
	[key: string]: JSX.Element
}

export default function Rules({ van }: RulesProps) {
	const rulesIcons: RulesIconsType = {
		"Min. 18 years old": <BsPersonVcard size={40} />,
		"Festival Friendly": <GiMusicalNotes size={40} />,
		"Pet Friendly": <PiPawPrint size={40} />
	}

	return (
		<div className="py-5 border-b border-gray-300">
			<h4 className="font-bold text-xl">Vehicle rules</h4>
			<ul className="flex flex-wrap justify-between gap-4 py-5">
				{van.vehicle_rules.map((rule) => (
					<li
						key={rule}
						className="flex flex-col items-center gap-1"
					>
						{rulesIcons[rule]}
						{rule}
					</li>
				))}
			</ul>
		</div>
	)
}
