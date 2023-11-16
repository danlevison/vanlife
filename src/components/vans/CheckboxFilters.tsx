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
	paramKeys: string[]
}

export default function CheckboxFilters({
	handleFilterChange,
	paramKeys
}: CheckboxFiltersProps) {
	const checkboxOptions = useMemo(
		() => ["simple", "automatic", "manual", "festival", "pet"],
		[]
	)
	const initialState = checkboxOptions.map((option) =>
		paramKeys.includes(option)
	)
	const [checkedState, setCheckedState] = useState(
		initialState || new Array(checkboxOptions.length).fill(false)
	)
	const [addedFilters, setAddedFilters] = useState<string[]>([])
	const [uncheckedFilters, setUncheckedFilters] = useState<string[]>([])

	useEffect(() => {
		const updatedState = checkboxOptions.map((option) =>
			paramKeys.includes(option)
		)
		setCheckedState(updatedState)
	}, [paramKeys, checkboxOptions])

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
		addedFilters.forEach((filter) => handleFilterChange(filter, "true"))
		uncheckedFilters.forEach((filter) => handleFilterChange(filter, null))
		if (checkedState.every((element) => !element)) {
			checkboxOptions.forEach((option) => handleFilterChange(option, null))
		}
	}

	const clearFilters = () => {
		setAddedFilters([])
		setUncheckedFilters([])
		setCheckedState(new Array(checkboxOptions.length).fill(false))
	}

	return (
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
								className="w-5 h-5 accent-accent"
							/>
							<Label htmlFor={option}>{option}</Label>
						</li>
					))}
				</ul>
				<DropdownMenuSeparator />
				<div className="flex justify-between items-center gap-4">
					<Button
						onClick={clearFilters}
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
	)
}
