import { useState, useEffect, useMemo } from "react"
import {
	DropdownMenu,
	DropdownMenuSeparator,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { Label } from "../ui/label"

type CheckboxFiltersProps = {
	handleFilterChange: (key: string, value: string | null) => void
	paramsKeys: string[]
	resetCheckboxFilters: boolean
}

export default function CheckboxFilters({
	handleFilterChange,
	paramsKeys,
	resetCheckboxFilters
}: CheckboxFiltersProps) {
	const checkboxOptions = useMemo(
		() => ["automatic", "manual", "festival friendly", "pet friendly"],
		[]
	)
	const initialState = checkboxOptions.map((option) =>
		paramsKeys.includes(option)
	)
	const [checkedState, setCheckedState] = useState(
		initialState || new Array(checkboxOptions.length).fill(false)
	)
	const [uncheckedFilters, setUncheckedFilters] = useState<string[]>([])
	const [addedFilters, setAddedFilters] = useState<string[]>([])

	// this synchronises the state of checkboxes (checkedState) with the applied filters (paramsKeys) to ensure UI is updated.
	useEffect(() => {
		const updatedState = checkboxOptions.map((option) =>
			paramsKeys.includes(option)
		)
		setCheckedState(updatedState)
	}, [paramsKeys, checkboxOptions])

	// resets added filters & unchecked filters array if a checkbox option is checked but then never applied or cleared
	// this prevents a bug when a user then applies a sort by filter or van type filter after.
	useEffect(() => {
		setAddedFilters([])
		setUncheckedFilters([])
	}, [checkboxOptions.length, resetCheckboxFilters])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		position: number
	) => {
		setCheckedState((prevCheckedState) => {
			return prevCheckedState.map((item, index) =>
				index === position ? !item : item
			)
		})

		setAddedFilters((prevAddedFilters) => {
			const checked = e.target.checked
			const value = e.target.value

			// If the checkbox is checked, add the value to addedFiltersArr
			if (checked && !prevAddedFilters.includes(value)) {
				return [...prevAddedFilters, value]
			}

			// If the checkbox is unchecked, remove the value from addedFiltersArr
			return prevAddedFilters.filter((item) => item !== value)
		})

		setUncheckedFilters((prevUncheckedFilters) => {
			const checked = e.target.checked
			const value = e.target.value

			// If the checkbox is unchecked, add the value to uncheckedFiltersArr
			if (!checked && !prevUncheckedFilters.includes(value)) {
				return [...prevUncheckedFilters, value]
			}

			// If the checkbox is checked, remove the value from uncheckedFiltersArr
			return prevUncheckedFilters.filter((item) => item !== value)
		})
	}

	const handleFilterValues = () => {
		// adds the search param with key=filter and value=true for the checked checkboxes
		addedFilters.forEach((filter) => handleFilterChange(filter, "true"))
		// removes search param of key=filter for the unchecked checkboxes
		uncheckedFilters.forEach((filter) => handleFilterChange(filter, null))
		// removes all filters if all checkboxes are unchecked
		if (checkedState.every((element) => !element)) {
			checkboxOptions.forEach((option) => handleFilterChange(option, null))
		}
	}

	const clearDropdownFilters = () => {
		setAddedFilters([])
		setUncheckedFilters([])
		setCheckedState(new Array(checkboxOptions.length).fill(false))
	}

	const clearAllFilters = () => {
		clearDropdownFilters()
		paramsKeys.forEach((key) => handleFilterChange(key, null))
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className="px-3 py-2 rounded-lg font-semibold bg-[#FFEAD0] text-primaryText">
					More filters
				</DropdownMenuTrigger>

				<DropdownMenuContent
					className="w-56 p-2"
					align="start"
				>
					<ul className="flex flex-col gap-3 pb-2">
						{checkboxOptions.map((option, index) => (
							<li
								className="flex items-center gap-2"
								key={option}
							>
								<input
									onChange={(e) => handleChange(e, index)}
									checked={checkedState[index]}
									type="checkbox"
									id={option}
									value={option}
									className="relative peer shrink-0 appearance-none w-5 h-5 border-2 border-accent rounded-sm bg-white checked:bg-accent checked:border-0"
								/>
								<Label
									htmlFor={option}
									className="text-base capitalize"
								>
									{option}
								</Label>
								<svg
									className="absolute w-5 h-5 hidden peer-checked:block pointer-events-none"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="white"
									strokeWidth="3"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<polyline points="20 6 9 17 4 12"></polyline>
								</svg>
							</li>
						))}
					</ul>
					<DropdownMenuSeparator />
					<div className="flex justify-between items-center gap-4">
						<Button
							onClick={clearDropdownFilters}
							variant={"link"}
							className="w-fit h-fit"
						>
							Clear
						</Button>

						<DropdownMenuItem className="focus:bg-transparent">
							<Button
								onClick={handleFilterValues}
								className="w-fit h-fit"
							>
								Apply
							</Button>
						</DropdownMenuItem>
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
			{paramsKeys.length > 0 && (
				<Button
					variant={"link"}
					onClick={clearAllFilters}
					className="text-primaryText"
				>
					Clear all
				</Button>
			)}
		</>
	)
}
