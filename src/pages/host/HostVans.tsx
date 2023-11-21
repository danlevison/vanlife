import { useEffect, useCallback, useState, useContext } from "react"
import { fetchHostVansData } from "@/api"
import VansDataContext from "@/context/VansDataContext"
import Loading from "@/components/Loading"
import VanCard from "@/components/vans/VanCard"

export default function HostVans() {
	const { hostVans, setHostVans } = useContext(VansDataContext)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)
	const [imageLoading, setImageLoading] = useState(true)

	const vanTypeColour = {
		simple: "bg-[#E17654]",
		rugged: "bg-[#115E59]",
		luxury: "bg-[#161616]"
	} as Record<string, string>

	const loadVansData = useCallback(async () => {
		setError(null)

		try {
			const data = await fetchHostVansData()
			setHostVans(data)
		} catch (error) {
			setError("Unable to fetch listed vans!")
			console.error(error)
		} finally {
			setLoading(false)
		}
	}, [setHostVans])

	useEffect(() => {
		loadVansData()
	}, [loadVansData])

	useEffect(() => {
		if (hostVans) {
			const imagePromises = hostVans.map((van) => {
				return new Promise<void>((resolve) => {
					const image = new Image()
					image.onload = () => {
						resolve()
					}
					image.src = van.imageURL
				})
			})

			Promise.all(imagePromises)
				.then(() => setImageLoading(false))
				.catch((error) => console.error(error))
		}
	}, [hostVans])

	if (error) {
		return (
			<div className="flex flex-col items-center min-h-screen py-32 px-8">
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
		<section className="w-full max-w-[1240px] mx-auto p-8">
			<div className="flex justify-between items-center pb-1">
				<h1 className="text-2xl sm:text-3xl md:text-4xl">Your listed vans</h1>
			</div>
			{loading || imageLoading ? (
				<Loading />
			) : (
				<ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-center items-center gap-10 w-full">
					{hostVans?.map((van) => (
						<VanCard
							key={van.id}
							van={van}
							vanTypeColour={vanTypeColour}
						/>
					))}
				</ul>
			)}
		</section>
	)
}
