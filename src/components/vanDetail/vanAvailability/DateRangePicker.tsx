import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover"
import { BsArrowRight } from "react-icons/bs"

type DateRangePickerType = {
	date: DateRange | undefined
	setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
	className?: React.HTMLAttributes<HTMLDivElement>
}

export default function DateRangePicker({
	date,
	setDate,
	className
}: DateRangePickerType) {
	return (
		<div className={cn("hidden md:grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
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
				</PopoverTrigger>
				<PopoverContent
					className="w-auto p-0"
					align="center"
				>
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
						disabled={{ before: new Date() }}
					/>
				</PopoverContent>
			</Popover>
		</div>
	)
}
