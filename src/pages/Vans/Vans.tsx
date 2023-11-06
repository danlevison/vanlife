import { useState, useEffect, useContext } from "react"
import { useSearchParams } from "react-router-dom"
import VansDataContext from "../../context/VansDataContext"
import { fetchVansData } from "../../api"
import VanCard from "@/components/vans/VanCard"
import Loading from "@/components/Loading"
// type

export default function Vans() {
	const { vans, setVans } = useContext(VansDataContext)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [searchParams, setSearchParams] = useSearchParams()
	const vanTypeFilter = searchParams.get("type")

	const vanTypeColour = {
		simple: "bg-[#E17654]",
		rugged: "bg-[#115E59]",
		luxury: "bg-[#161616]"
	} as Record<string, string>

	const loadVansData = async () => {
		setLoading(true)
		setError(null)

		try {
			const data = await fetchVansData()
			setVans(data)
		} catch (error) {
			setError("It looks like something went wrong!")
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadVansData()
	}, [])

	const displayedVans = vanTypeFilter
		? vans?.filter((van) => van.type.toLowerCase() === vanTypeFilter)
		: vans

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

	if (error) {
		return (
			<div className="flex flex-col items-center min-h-screen py-32">
				<h1 className="text-center text-4xl pb-3">{error}</h1>
				<button
					onClick={loadVansData}
					className="px-3 py-2 bg-[#161616] text-white rounded-lg font-semibold"
				>
					Please try again
				</button>
			</div>
		)
	}

	return (
		<div className="flex flex-col min-h-screen max-w-[1440px] mx-auto px-8 py-20">
			<h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-primaryText text-center md:text-left pt-8">
				Explore our van options
			</h1>
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
						Clear filter
					</button>
				)}
			</div>
			{loading ? (
				<Loading />
			) : (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-center items-center gap-10 w-full">
					{displayedVans?.map((van) => (
						<VanCard
							key={van.id}
							van={van}
							vanTypeColour={vanTypeColour}
						/>
					))}
				</div>
			)}
		</div>
	)
}
