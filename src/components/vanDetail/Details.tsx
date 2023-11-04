import { VehicleDetails } from "../../types/vanType"
import { VanType } from "../../types/vanType"

type DetailsProps = {
	van: VanType
}

export default function Details({ van }: DetailsProps) {
	const {
		Make,
		Model,
		Engine,
		Transmission,
		Height,
		Length,
		Width,
		Type,
		Year
	} = van?.vehicle_details as VehicleDetails

	return (
		<div className="py-5 border-b border-gray-300">
			<h4 className="font-bold text-xl">Vehicle details</h4>
			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 py-5">
				<li>
					Make: <span className="font-bold">{Make}</span>
				</li>
				<li>
					Engine: <span className="font-bold">{Engine}</span>
				</li>
				<li>
					Length: <span className="font-bold">{Length}</span>
				</li>
				<li>
					Model: <span className="font-bold">{Model}</span>
				</li>
				<li>
					Transmission: <span className="font-bold">{Transmission}</span>
				</li>
				<li>
					Width: <span className="font-bold">{Width}</span>
				</li>
				<li>
					Type: <span className="font-bold">{Type}</span>
				</li>
				<li>
					Year: <span className="font-bold">{Year}</span>
				</li>
				<li>
					Height: <span className="font-bold">{Height}</span>
				</li>
			</ul>
		</div>
	)
}
