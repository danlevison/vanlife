import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { PiCaretDownLight } from "react-icons/pi"

type SortByProps = {
	handleFilterChange: (key: string, value: string | null) => void
	resetCheckboxFilters: boolean
	setResetCheckboxFilters: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SortBy({
	handleFilterChange,
	resetCheckboxFilters,
	setResetCheckboxFilters
}: SortByProps) {
	const handleSortBySearchParam = (key: string, value: string) => {
		setResetCheckboxFilters(!resetCheckboxFilters)
		handleFilterChange(key, value)
	}
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
						onClick={() => handleSortBySearchParam("sort_by", "rating")}
					>
						Rating
					</button>
				</DropdownMenuItem>
				<DropdownMenuItem className="p-0 text-base">
					<button
						className="w-full text-left px-2 py-1.5 hover:text-white"
						onClick={() => handleSortBySearchParam("sort_by", "HL")}
					>
						Price: High - Low
					</button>
				</DropdownMenuItem>
				<DropdownMenuItem className="p-0 text-base">
					<button
						className="w-full text-left px-2 py-1.5 hover:text-white"
						onClick={() => handleSortBySearchParam("sort_by", "LH")}
					>
						Price: Low - High
					</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
