import { useContext, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import VansDataContext from "../../context/VansDataContext"
import CheckboxFilters from "./CheckboxFilters"
import SortBy from "./SortBy"

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
	const sortByFilter = searchParams.get("sort_by")
	const paramsKeys: string[] = []
	const paramsValues: string[] = []

	searchParams.forEach((value, key) => {
		if (key !== "sort_by") {
			paramsKeys.push(key)
			paramsValues.push(value)
		}
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

	const filterByParams = (vans: VanType[]): VanType[] => {
		if (
			paramsKeys.length === 0 ||
			(paramsKeys.length === 1 && paramsKeys.includes("type"))
		) {
			return vans
		}

		const transmissionFilter = vans.filter((van) => {
			return paramsKeys.some((key) => {
				if (
					van.vehicle_details &&
					typeof van.vehicle_details === "object" &&
					"Transmission" in van.vehicle_details &&
					typeof van.vehicle_details.Transmission === "string"
				) {
					return (
						van.vehicle_details?.Transmission?.toLowerCase() ===
						key.toLowerCase()
					)
				}
			})
		})

		const ruleFilter = vans.filter((van) => {
			return paramsKeys.some((key) => {
				return van.vehicle_rules.some((rule) =>
					rule.toLowerCase().includes(key.toLowerCase())
				)
			})
		})

		// If only transmission filter is applied, return the transmission-filtered vans directly
		if (ruleFilter.length === 0) {
			return transmissionFilter
		}

		// If only rule-based filter is applied, return the rule-filtered vans directly
		if (transmissionFilter.length === 0) {
			return ruleFilter
		}

		// Use set intersection if both filters are applied
		return transmissionFilter.filter((van) => ruleFilter.includes(van))
	}

	const sortBy = (vans: VanType[], sortByFilter: string | null): VanType[] => {
		if (!sortByFilter) {
			return vans
		}

		if (sortByFilter === "LH") {
			return [...vans].sort((a, b) => parseInt(a.price) - parseInt(b.price))
		} else if (sortByFilter === "HL") {
			return [...vans].sort((a, b) => parseInt(b.price) - parseInt(a.price))
		} else if (sortByFilter === "rating") {
			return [...vans].sort((a, b) => {
				const ratingA = a.rating || 0
				const ratingB = b.rating || 0

				return ratingB - ratingA
			})
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

	const activeFilters = () => {
		if (paramsKeys.length > 0) {
			return paramsKeys.map((key) => (
				<p
					key={key}
					className="group px-2 py-1 bg-gray-200 rounded-md text-sm"
				>
					{key.toString().charAt(0).toUpperCase() + key.toString().slice(1)}{" "}
				</p>
			))
		}
	}

	useEffect(() => {
		if (vans) {
			const filteredByType = filterByType(vans, vanTypeFilter)
			const filteredByParams = filterByParams(filteredByType)
			const sortedBy = sortBy(filteredByParams, sortByFilter)
			setFilteredVans(sortedBy)
		}
	}, [sortByFilter, vans, setFilteredVans, searchParams, vanTypeFilter])

	return (
		<div className="border-b border-gray-300 mb-4">
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
				<SortBy handleFilterChange={handleFilterChange} />
				<CheckboxFilters
					handleFilterChange={handleFilterChange}
					paramsKeys={paramsKeys}
				/>
			</div>

			<div className="flex items-center gap-3 pb-2 text-primaryText">
				<p>
					{paramsKeys.length} {paramsKeys.length === 1 ? "Filter" : "Filters"}
				</p>
				{activeFilters()}
			</div>
		</div>
	)
}

export default Filters
