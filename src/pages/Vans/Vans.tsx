import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { fetchVanData } from "../../api"

type VanType = {
	createdAt: string
	description: string
	name: string
	price: string
	type: string
	imageURL: string
	id: number
	hostId: string
	vanId: string
}

export default function Vans() {
	const [vans, setVans] = useState<VanType[] | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [searchParams, setSearchParams] = useSearchParams()
	const vanTypeFilter = searchParams.get("type")

	const vanTypeColour = {
		simple: "#E17654",
		rugged: "#115E59",
		luxury: "#161616"
	} as Record<string, string>

	const loadVanData = async () => {
		setLoading(true)
		setError(null)

		try {
			const data = await fetchVanData()
			setVans(data)
		} catch (error) {
			setError("It looks like something went wrong!")
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadVanData()
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

	if (loading) {
		return (
			<div className="min-h-screen py-32">
				<h1 className="text-center text-4xl">Loading...</h1>
			</div>
		)
	}

	if (error) {
		return (
			<div className="flex flex-col items-center min-h-screen py-32">
				<h1 className="text-center text-4xl pb-3">{error}</h1>
				<button
					onClick={loadVanData}
					className="px-3 py-2 bg-[#161616] text-white rounded-lg font-semibold"
				>
					Please try again
				</button>
			</div>
		)
	}

	return (
		<div className="flex flex-col min-h-screen px-10 py-20">
			<h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-primaryText text-center md:text-left pt-8">
				Explore our van options
			</h1>
			<div className="flex flex-wrap items-center gap-4 py-8">
				<button
					onClick={() => handleFilterChange("type", "simple")}
					className={`px-3 py-2 rounded-lg font-semibold ${
						vanTypeFilter === "simple"
							? `bg-[${vanTypeColour["simple"]}] text-[#FFEAD0]`
							: "bg-[#FFEAD0] text-primaryText"
					}`}
				>
					Simple
				</button>
				<button
					onClick={() => handleFilterChange("type", "luxury")}
					className={`px-3 py-2 rounded-lg font-semibold ${
						vanTypeFilter === "luxury"
							? `bg-[${vanTypeColour["luxury"]}] text-[#FFEAD0]`
							: "bg-[#FFEAD0] text-primaryText"
					}`}
				>
					Luxury
				</button>
				<button
					onClick={() => handleFilterChange("type", "rugged")}
					className={`px-3 py-2 rounded-lg font-semibold ${
						vanTypeFilter === "rugged"
							? `bg-[${vanTypeColour["rugged"]}] text-[#FFEAD0]`
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
			<div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-center items-center gap-10 w-full">
				{displayedVans?.map((van: VanType) => (
					<div key={van.id}>
						<Link to={van.vanId}>
							<img
								src={van.imageURL}
								alt={`Photo of ${van.name} campervan`}
								className="rounded-lg"
							/>
							<div className="flex justify-between items-center font-bold text-primaryText text-xl py-2">
								<h3>{van.name}</h3>
								<p>
									${van.price}
									<span className="font-normal text-lg">/day</span>
								</p>
							</div>
							<i
								className={`px-3 py-2 text-[#FFEAD0] rounded-lg font-semibold bg-[${
									vanTypeColour[van.type.toLowerCase()] || "#00000"
								}]`}
							>
								{van.type}
							</i>
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}
