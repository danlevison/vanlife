import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover"
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2"

type TripCostsType = {
	vanPrice: string
	tripNights: number
}

export default function TripCosts({ vanPrice, tripNights }: TripCostsType) {
	const vanCost = parseInt(vanPrice) * tripNights
	const prepFee = 54.42
	const insuranceFee = 212.35
	const totalTripCost = vanCost + prepFee + insuranceFee
	return (
		<div className="flex flex-col gap-2 mt-5">
			<div className="flex items-center justify-between">
				<p className="text-sm sm:text-base">
					£{vanPrice} x {tripNights} {tripNights === 1 ? "night" : "nights"}
				</p>
				<p className="text-sm sm:text-base">£{vanCost.toFixed(2)}</p>
			</div>
			<div className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-1">
					<p className="text-sm sm:text-base">Preparation fee</p>
					<Popover>
						<PopoverTrigger>
							<HiOutlineQuestionMarkCircle size={20} />
						</PopoverTrigger>
						<PopoverContent className="text-sm">
							<h4>Preperation fee</h4>
							<p>
								Includes expenses related to depot logistics, documentation,
								pre-arrival checkup, kit setup, and cleaning supplies.
							</p>
						</PopoverContent>
					</Popover>
				</div>
				<p className="text-sm sm:text-base">£{prepFee}</p>
			</div>
			<div className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-1">
					<p className="text-sm sm:text-base">Insurance and Service fee</p>
					<Popover>
						<PopoverTrigger>
							<HiOutlineQuestionMarkCircle size={20} />
						</PopoverTrigger>
						<PopoverContent className="text-sm">
							<h4>Insurance and Service fee</h4>
							<p>
								The service fee encompasses the expenses associated with
								operating the platform and applicable taxes. Third-party
								liability is covered by the vehicle insurance. For enhanced
								protection during your road trip and a reduction in maximum
								liability, you have the option to select the Premium Protection
								plan.
							</p>
						</PopoverContent>
					</Popover>
				</div>
				<p className="text-sm sm:text-base">£{insuranceFee}</p>
			</div>
			<div className="flex items-center justify-between font-bold text-secondaryAccent text-xl border-t border-gray-300 py-2">
				<p>Total</p>
				<p>£{totalTripCost}</p>
			</div>
		</div>
	)
}
