import { useOutletContext } from "react-router-dom"
//types
import { VanType } from "@/types/vanType"

export default function HostVanPricing() {
	const { van }: { van: VanType } = useOutletContext()
	return (
		<img
			src={van.imageURL}
			alt="/"
			className="w-full max-w-[150px] rounded-md"
		/>
	)
}
