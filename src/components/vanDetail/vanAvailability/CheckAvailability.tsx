import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { LiaBoltSolid } from "react-icons/lia"
import DateRangePicker from "./DateRangePicker"
import { Button } from "@/components/ui/button"
import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"
import TripCosts from "./TripCosts"
//types
import { VanType } from "@/types/vanType"

type CheckAvailabilityProps = {
	van: VanType
}

export default function CheckAvailability({ van }: CheckAvailabilityProps) {
	const [date, setDate] = useState<DateRange | undefined>({
		from: undefined,
		to: addDays(new Date(), 0)
	})
	const [showTripCosts, setShowTripCosts] = useState(false)
	const [tripNights, setTripNights] = useState(0)

	useEffect(() => {
		const day = 1000 * 60 * 60 * 24 // milliseconds in a day

		if (date?.from && date?.to) {
			const tripLength = date.to.getTime() - date.from.getTime()
			setTripNights(Math.floor(tripLength / day))
		}
	}, [date?.from, date?.to])

	return (
		<div className="border border-gray-300 rounded-md w-full max-w-[330px]">
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
				<DateRangePicker
					date={date}
					setDate={setDate}
				/>

				{showTripCosts ? (
					<>
						{tripNights === 0 || !date?.from || !date.to ? (
							<p className="mt-4 font-bold text-center">
								Unfortunately, no campers match your search criteria
							</p>
						) : (
							<>
								<TripCosts
									vanPrice={van.price}
									tripNights={tripNights}
								/>
								<Link
									to="/host"
									className="block mt-5 text-center py-2 bg-accent rounded-md text-white sm:text-lg font-bold hover:bg-accent/80 duration-300"
								>
									Continue
								</Link>
								<span className="mt-2 text-gray-400 block text-center text-sm sm:text-base">
									You won't be charged yet
								</span>
							</>
						)}
					</>
				) : (
					<Button
						onClick={() => setShowTripCosts(true)}
						className="mt-10 sm:text-lg font-bold w-full"
					>
						Check Availability
					</Button>
				)}
			</div>
		</div>
	)
}
