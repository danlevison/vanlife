import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { PiCaretDownLight } from "react-icons/pi"

type SortByProps = {
	handleFilterChange: (key: string, value: string | null) => void
}

export default function SortBy({ handleFilterChange }: SortByProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="px-3 py-2 rounded-lg font-semibold bg-[#FFEAD0] text-primaryText">
				Sort by{" "}
				<PiCaretDownLight
					size={20}
					className="inline-block "
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-40"
				align="start"
			>
				<DropdownMenuItem className="p-0 text-base">
					<button
						className="w-full text-left px-2 py-1.5 hover:text-white"
						onClick={() => handleFilterChange("sort_by", "rating")}
					>
						Rating
					</button>
				</DropdownMenuItem>
				<DropdownMenuItem className="p-0 text-base">
					<button
						className="w-full text-left px-2 py-1.5 hover:text-white"
						onClick={() => handleFilterChange("sort_by", "HL")}
					>
						Price: High - Low
					</button>
				</DropdownMenuItem>
				<DropdownMenuItem className="p-0 text-base">
					<button
						className="w-full text-left px-2 py-1.5 hover:text-white"
						onClick={() => handleFilterChange("sort_by", "LH")}
					>
						Price: Low - High
					</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
