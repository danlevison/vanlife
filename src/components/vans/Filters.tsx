import { useContext, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import VansDataContext from "../../context/VansDataContext"
import { PiCaretDownLight } from "react-icons/pi"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
//types
import { VanType } from "@/types/vanType"

type FiltersProps = {
	setFilteredVans: React.Dispatch<React.SetStateAction<VanType[] | null>>
	vanTypeColour: Record<string, string>
}

function Filters({ vanTypeColour, setFilteredVans }: FiltersProps) {
	const { vans } = useContext(VansDataContext)
	const [searchParams, setSearchParams] = useSearchParams()
	const vanTypeFilter = searchParams.get("type")
	const vanPriceFilter = searchParams.get("price")
	const params: string[] = []

	searchParams.forEach((_, key) => {
		params.push(key)
	})

	const filterByType = (
		vans: VanType[],
		typeSortParam: string | null
	): VanType[] => {
		if (!typeSortParam) {
			return vans
		}
		return vans.filter((van) => van.type.toLowerCase() === typeSortParam)
	}

	const filterByPrice = (
		vans: VanType[],
		priceSortParam: string | null
	): VanType[] => {
		if (!priceSortParam) {
			return vans
		}

		if (priceSortParam === "LH") {
			return [...vans].sort((a, b) => parseInt(a.price) - parseInt(b.price))
		} else if (priceSortParam === "HL") {
			return [...vans].sort((a, b) => parseInt(b.price) - parseInt(a.price))
		}

		return vans
	}

	const handleFilterChange = (key: string, value: string | null) => {
		setSearchParams((prevParams) => {
			if (value === null) {
				prevParams.delete(key)
			} else {
				prevParams.set(key, value)
			}
			return prevParams
		})
	}

	useEffect(() => {
		if (vans) {
			const filteredByType = filterByType(vans, vanTypeFilter)
			const filteredByTypeAndPrice = filterByPrice(
				filteredByType,
				vanPriceFilter
			)
			setFilteredVans(filteredByTypeAndPrice)
		}
	}, [vanTypeFilter, vanPriceFilter, vans, setFilteredVans])

	return (
		<div className="flex justify-between items-center">
			<div className="flex flex-wrap items-center gap-4 py-8">
				<button
					onClick={() => handleFilterChange("type", "simple")}
					className={`px-3 py-2 rounded-lg font-semibold ${
						vanTypeFilter === "simple"
							? `${vanTypeColour["simple"]} text-[#FFEAD0]`
							: "bg-[#FFEAD0] text-primaryText"
					}`}
				>
					Simple
				</button>
				<button
					onClick={() => handleFilterChange("type", "luxury")}
					className={`px-3 py-2 rounded-lg font-semibold ${
						vanTypeFilter === "luxury"
							? `${vanTypeColour["luxury"]} text-[#FFEAD0]`
							: "bg-[#FFEAD0] text-primaryText"
					}`}
				>
					Luxury
				</button>
				<button
					onClick={() => handleFilterChange("type", "rugged")}
					className={`px-3 py-2 rounded-lg font-semibold ${
						vanTypeFilter === "rugged"
							? `${vanTypeColour["rugged"]} text-[#FFEAD0]`
							: "bg-[#FFEAD0] text-primaryText"
					}`}
				>
					Rugged
				</button>
				{vanTypeFilter && (
					<button
						onClick={() => handleFilterChange("type", null)}
						className="px-3 py-2 underline"
					>
						Clear filters
					</button>
				)}
			</div>

			<DropdownMenu>
				<DropdownMenuTrigger>
					Sort by{" "}
					<PiCaretDownLight
						size={20}
						className="inline-block"
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>
						<button onClick={() => handleFilterChange("price", "HL")}>
							Price: High - Low
						</button>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<button onClick={() => handleFilterChange("price", "LH")}>
							Price: Low - High
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default Filters
