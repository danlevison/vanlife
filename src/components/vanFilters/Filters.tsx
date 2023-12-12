import { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import VansDataContext from "@/context/VansDataContext"
import CheckboxFilters from "./CheckboxFilters"
import SortBy from "./SortBy"
//types
import { VanType } from "@/types/vanType"

type FiltersProps = {
	setNoVans: React.Dispatch<React.SetStateAction<boolean>>
	vanTypeColour: Record<string, string>
	setFilteredVans: React.Dispatch<React.SetStateAction<VanType[] | null>>
}

function Filters({ vanTypeColour, setFilteredVans, setNoVans }: FiltersProps) {
	const { vans } = useContext(VansDataContext)
	const [searchParams, setSearchParams] = useSearchParams()
	const [resetCheckboxFilters, setResetCheckboxFilters] = useState(false)
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

		const getAutomaticVans = vans.filter((van) => {
			if (
				van.vehicle_details &&
				typeof van.vehicle_details === "object" &&
				"Transmission" in van.vehicle_details &&
				typeof van.vehicle_details.Transmission === "string"
			) {
				return van.vehicle_details?.Transmission?.toLowerCase() === "automatic"
			}
		})

		const getManualVans = vans.filter((van) => {
			if (
				van.vehicle_details &&
				typeof van.vehicle_details === "object" &&
				"Transmission" in van.vehicle_details &&
				typeof van.vehicle_details.Transmission === "string"
			) {
				return van.vehicle_details?.Transmission?.toLowerCase() === "manual"
			}
		})

		const getPetFriendlyVans = vans.filter((van) => {
			return van.vehicle_rules.some(
				(rule) => rule.toLowerCase() === "pet friendly"
			)
		})

		const getFestivalFriendlyVans = vans.filter((van) => {
			return van.vehicle_rules.some(
				(rule) => rule.toLowerCase() === "festival friendly"
			)
		})

		if (
			paramsKeys.includes("automatic") &&
			paramsKeys.includes("manual") &&
			paramsKeys.includes("festival friendly") &&
			paramsKeys.includes("pet friendly")
		) {
			return vans
		}

		// transmission & pet/festival friendly filters

		// returns automatic vans that are pet friendly and festival friendly van
		if (
			paramsKeys.includes("automatic") &&
			paramsKeys.includes("pet friendly") &&
			paramsKeys.includes("festival friendly")
		) {
			return getAutomaticVans.filter(
				(van) =>
					getPetFriendlyVans.includes(van) &&
					getFestivalFriendlyVans.includes(van)
			)
		}

		// returns manual vans that are pet friendly and festival friendly van
		if (
			paramsKeys.includes("manual") &&
			paramsKeys.includes("pet friendly") &&
			paramsKeys.includes("festival friendly")
		) {
			return getManualVans.filter(
				(van) =>
					getPetFriendlyVans.includes(van) &&
					getFestivalFriendlyVans.includes(van)
			)
		}

		// returns automatic and manual vans (all vans) that are festival friendly
		if (
			paramsKeys.includes("automatic") &&
			paramsKeys.includes("manual") &&
			paramsKeys.includes("festival friendly")
		) {
			return getFestivalFriendlyVans
		}

		// returns automatic and manual vans (all vans) that are festival friendly
		if (
			paramsKeys.includes("automatic") &&
			paramsKeys.includes("manual") &&
			paramsKeys.includes("pet friendly")
		) {
			return getPetFriendlyVans
		}

		// returns automatic and pet friendly vans
		if (
			paramsKeys.includes("automatic") &&
			paramsKeys.includes("pet friendly")
		) {
			return getAutomaticVans.filter((van) => getPetFriendlyVans.includes(van))
		}

		// returns manual and pet friendly vans
		if (paramsKeys.includes("manual") && paramsKeys.includes("pet friendly")) {
			return getManualVans.filter((van) => getPetFriendlyVans.includes(van))
		}

		// returns automatic and festival friendly vans
		if (
			paramsKeys.includes("automatic") &&
			paramsKeys.includes("festival friendly")
		) {
			return getAutomaticVans.filter((van) =>
				getFestivalFriendlyVans.includes(van)
			)
		}

		// returns manual and festival friendly vans
		if (
			paramsKeys.includes("manual") &&
			paramsKeys.includes("festival friendly")
		) {
			return getManualVans.filter((van) =>
				getFestivalFriendlyVans.includes(van)
			)
		}

		// transmission filters

		// returns manual and automatic vans
		if (paramsKeys.includes("manual") && paramsKeys.includes("automatic")) {
			return [...getManualVans, ...getAutomaticVans]
		}

		// returns manual vans
		if (paramsKeys.includes("manual")) {
			return getManualVans
		}

		// returns automatic vans
		if (paramsKeys.includes("automatic")) {
			return getAutomaticVans
		}

		// pet/festival friendly filters

		// returns pet friendly and festival friendly vans
		if (
			paramsKeys.includes("pet friendly") &&
			paramsKeys.includes("festival friendly")
		) {
			return getPetFriendlyVans.filter((van) =>
				getFestivalFriendlyVans.includes(van)
			)
		}

		// returns pet friendly vans
		if (paramsKeys.includes("pet friendly")) {
			return getPetFriendlyVans
		}

		// returns festival friendly vans
		if (paramsKeys.includes("festival friendly")) {
			return getFestivalFriendlyVans
		}

		return vans
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

	const handleAddTypeSearchParam = (key: string, value: string) => {
		setResetCheckboxFilters(!resetCheckboxFilters)
		handleFilterChange(key, value)
	}

	const activeFilters = () => {
		if (paramsKeys.length > 0) {
			return paramsKeys.map((key) => {
				if (key === "type") {
					return paramsValues.map((value) => {
						if (
							value === "simple" ||
							value === "luxury" ||
							value === "rugged"
						) {
							return (
								<p
									key={value}
									className="px-2 py-1 bg-gray-200 rounded-md text-sm"
								>
									{value.charAt(0).toUpperCase() + value.slice(1)}
								</p>
							)
						}
					})
				} else {
					return (
						<p
							key={key}
							className="px-2 py-1 bg-gray-200 rounded-md text-sm"
						>
							{key.charAt(0).toUpperCase() + key.slice(1)}{" "}
						</p>
					)
				}
			})
		}
	}

	useEffect(() => {
		if (vans) {
			const filteredByType = filterByType(vans, vanTypeFilter)

			const filteredByParams = filterByParams(filteredByType)
			filteredByParams.length === 0 ? setNoVans(true) : setNoVans(false)

			const sortedBy = sortBy(filteredByParams, sortByFilter)
			setFilteredVans(sortedBy)
		}
	}, [
		sortByFilter,
		vans,
		setFilteredVans,
		searchParams,
		vanTypeFilter,
		setNoVans
	])

	return (
		<div className="border-b border-gray-300 mb-4">
			<div className="flex flex-wrap justify-center md:justify-start items-center gap-4 py-8">
				<button
					onClick={() => handleAddTypeSearchParam("type", "simple")}
					className={`px-3 py-2 rounded-lg font-semibold ${
						vanTypeFilter === "simple"
							? `${vanTypeColour["simple"]} text-[#FFEAD0]`
							: "bg-[#FFEAD0] text-primaryText"
					}`}
				>
					Simple
				</button>
				<button
					onClick={() => handleAddTypeSearchParam("type", "luxury")}
					className={`px-3 py-2 rounded-lg font-semibold ${
						vanTypeFilter === "luxury"
							? `${vanTypeColour["luxury"]} text-[#FFEAD0]`
							: "bg-[#FFEAD0] text-primaryText"
					}`}
				>
					Luxury
				</button>
				<button
					onClick={() => handleAddTypeSearchParam("type", "rugged")}
					className={`px-3 py-2 rounded-lg font-semibold ${
						vanTypeFilter === "rugged"
							? `${vanTypeColour["rugged"]} text-[#FFEAD0]`
							: "bg-[#FFEAD0] text-primaryText"
					}`}
				>
					Rugged
				</button>
				<SortBy
					handleFilterChange={handleFilterChange}
					resetCheckboxFilters={resetCheckboxFilters}
					setResetCheckboxFilters={setResetCheckboxFilters}
				/>
				<CheckboxFilters
					handleFilterChange={handleFilterChange}
					paramsKeys={paramsKeys}
					resetCheckboxFilters={resetCheckboxFilters}
				/>
			</div>

			<div className="flex flex-wrap justify-start items-center gap-3 pb-2 text-primaryText">
				<p>
					{paramsKeys.length} {paramsKeys.length === 1 ? "Filter" : "Filters"}
				</p>
				{activeFilters()}
			</div>
		</div>
	)
}

export default Filters
