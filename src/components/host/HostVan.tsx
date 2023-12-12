import { Link } from "react-router-dom"
//types
import { VanType } from "@/types/vanType"

type HostVansProps = {
	van: VanType
}

export default function HostVan({ van }: HostVansProps) {
	return (
		<>
			<li
				key={van.id}
				className="flex flex-col xs:flex-row xs:items-center gap-3 bg-white p-5 rounded-md"
			>
				<div>
					<img
						src={van.imageURL}
						alt="/"
						className="max-w-[100px] rounded-lg"
					/>
				</div>
				<div>
					<h3 className="text-lg">{van.name}</h3>
					<p className="font-bold">
						£{van.price}
						<span className="font-normal">/night</span>
					</p>
				</div>
				<Link
					to={`vans/${van.hostId}`}
					className="ml-auto"
				>
					View
				</Link>
			</li>
		</>
	)
}
