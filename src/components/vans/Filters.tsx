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

	console.log(vanTypeFilter)

	const filterByType = (
		vans: VanType[],
		typeSortParam: string | null
	): VanType[] => {
		if (!typeSortParam) {
			return vans
		}
		return vans.filter((van) => van.type.toLowerCase() === typeSortParam)
	}

	const sortByPrice = (
		vans: VanType[],
		sortByFilter: string | null
	): VanType[] => {
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

	const removeFilterButton = () => {
		if (paramsKeys.length > 0) {
			return paramsKeys.map((key) => (
				<p
					key={key}
					className="group px-2 py-1 bg-gray-200 rounded-md text-sm"
				>
					{key.toString().charAt(0).toUpperCase() + key.toString().slice(1)}{" "}
					{/* <RiCloseFill className="inline-block" /> */}
				</p>
			))
		}
	}

	useEffect(() => {
		if (vans) {
			const filteredByType = filterByType(vans, vanTypeFilter)
			const sortedByPrice = sortByPrice(filteredByType, sortByFilter)
			setFilteredVans(sortedByPrice)
		}
	}, [vanTypeFilter, sortByFilter, vans, setFilteredVans])

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
					paramKeys={paramsKeys}
				/>
			</div>

			<div className="flex items-center gap-3 pb-2 text-primaryText">
				<p>
					{paramsKeys.length} {paramsKeys.length === 1 ? "Filter" : "Filters"}
				</p>
				{removeFilterButton()}
			</div>
		</div>
	)
}

export default Filters
