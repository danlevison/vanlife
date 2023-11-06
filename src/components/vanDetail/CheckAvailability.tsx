import { BsArrowRight } from "react-icons/bs"
import { LuCalendarSearch } from "react-icons/lu"
import { LiaBoltSolid } from "react-icons/lia"
import { VanType } from "@/types/vanType"

type CheckAvailabilityProps = {
	van: VanType
}

export default function CheckAvailability({ van }: CheckAvailabilityProps) {
	return (
		<div className="border border-gray-300 rounded-md">
			<div className="flex justify-between items-center border-b border-gray-300 p-4">
				<p className=" text-secondaryAccent">
					From <span className="font-bold text-xl">£{van.price}</span> / night
				</p>
				<div className="flex items-center text-purple-700 text-sm">
					<LiaBoltSolid size={20} />
					<p>Fast booking</p>
				</div>
			</div>
			<div className="p-4">
				<p className="text-sm font-bold mb-1">Dates</p>
				<div className="flex items-center justify-between text-sm border border-gray-300 rounded-md p-3 mb-10 hover:border-secondaryAccent cursor-pointer">
					<p className="flex items-center gap-1">
						{" "}
						<span>
							<LuCalendarSearch
								size={20}
								className="text-gray-400"
							/>
						</span>
						When To Go
					</p>
					<span>
						<BsArrowRight
							size={20}
							className="mx-2"
						/>
					</span>
					<p>When To Finish</p>
				</div>
				<button className="bg-accent rounded-md p-2 w-full sm:w-[300px] text-center text-lg text-white font-bold hover:opacity-70">
					Check availability
				</button>
			</div>
		</div>
	)
}
