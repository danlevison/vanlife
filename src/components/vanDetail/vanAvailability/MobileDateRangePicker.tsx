import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { BsArrowRight } from "react-icons/bs"
import { LiaBoltSolid } from "react-icons/lia"
// types
import { DateRange } from "react-day-picker"
import { VanType } from "@/types/vanType"

type MobileDateRangePickerType = {
	date: DateRange | undefined
	setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
	className?: React.HTMLAttributes<HTMLDivElement>
	van: VanType
	scrollToCostsRef: React.RefObject<HTMLDivElement>
}

export default function MobileDateRangePicker({
	date,
	setDate,
	className,
	van,
	scrollToCostsRef
}: MobileDateRangePickerType) {
	const scrollToCosts = () => {
		if (scrollToCostsRef.current) {
			scrollToCostsRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "start"
			})
		}
	}

	return (
		<div className={cn("grid gap-2 md:hidden", className)}>
			<Dialog>
				<div className="flex flex-col items-start gap-4">
					<DialogTrigger asChild>
						<Button
							id="date"
							variant={"outline"}
							className={cn(
								"w-full max-w-[300px] justify-start text-left font-normal",
								!date && "text-muted-foreground"
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{date?.from ? (
								date.to ? (
									<>
										{format(date.from, "LLL dd, y")}{" "}
										<BsArrowRight
											size={20}
											className="mx-2"
										/>{" "}
										{format(date.to, "LLL dd, y")}
									</>
								) : (
									format(date.from, "LLL dd, y")
								)
							) : (
								<div className="flex items-center justify-between w-full">
									<p>When To Go</p>
									<span>
										<BsArrowRight
											size={20}
											className="mx-2"
										/>
									</span>
									<p>When To Finish</p>
								</div>
							)}
						</Button>
					</DialogTrigger>
				</div>

				<div className="fixed left-[50%] translate-x-[-50%] bottom-0 flex justify-between items-center px-4 h-16 bg-background w-full border-t border-gray-300">
					<div className="flex flex-col items-center text-purple-700 text-sm">
						<p className=" text-secondaryAccent">
							From <span className="font-bold text-xl">£{van.price}</span> /
							night
						</p>
						<div className="flex items-center">
							<LiaBoltSolid size={20} />
							<p>Fast booking</p>
						</div>
					</div>
					<DialogTrigger asChild>
						<Button onClick={scrollToCosts}>Check Availability</Button>
					</DialogTrigger>
				</div>

				<DialogContent className="flex justify-center items-center max-w-full h-full bg-white">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
						disabled={{ before: new Date() }}
					/>
				</DialogContent>
			</Dialog>
		</div>
	)
}
