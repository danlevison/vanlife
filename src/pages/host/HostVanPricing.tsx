import { useOutletContext } from "react-router-dom"
//types
import { VanType } from "@/types/vanType"

export default function HostVanPricing() {
	const { van }: { van: VanType } = useOutletContext()
	return (
		<h3 className="text-xl md:text-2xl">
			${van.price}
			<span className="font-normal">/night</span>
		</h3>
	)
}
