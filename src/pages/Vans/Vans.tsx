import { useState, useEffect, useContext } from "react"
import VansDataContext from "../../context/VansDataContext"
import { fetchVansData } from "../../api"
import VanCard from "@/components/vans/VanCard"
import Loading from "@/components/Loading"
import Filters from "@/components/vans/Filters"
import { VanType } from "@/types/vanType"

export default function Vans() {
	const { setVans } = useContext(VansDataContext)
	const [filteredVans, setFilteredVans] = useState<VanType[] | null>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

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
			<Filters
				vanTypeColour={vanTypeColour}
				setFilteredVans={setFilteredVans}
			/>
			{loading ? (
				<Loading />
			) : (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-center items-center gap-10 w-full">
					{filteredVans?.map((van) => (
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
