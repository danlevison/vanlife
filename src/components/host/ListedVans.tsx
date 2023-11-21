import { useEffect, useCallback, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { fetchHostVansData } from "@/api"
import VansDataContext from "@/context/VansDataContext"
import Loading from "../Loading"
import HostVan from "./HostVan"

function ListedVans() {
	const { hostVans, setHostVans } = useContext(VansDataContext)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)
	const [imageLoading, setImageLoading] = useState(true)

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
		<section className="w-full max-w-[1240px] mx-auto py-10">
			<div className="flex justify-between items-center pt-8 pb-1">
				<h2 className="text-lg sm:text-xl md:text-2xl">Your listed vans</h2>
				<Link
					to="vans"
					className="text-sm sm:text-base"
				>
					View all
				</Link>
			</div>
			{loading || imageLoading ? (
				<Loading />
			) : (
				<ul className="flex flex-col gap-5">
					{hostVans?.map((van) => (
						<HostVan
							key={van.id}
							van={van}
						/>
					))}
				</ul>
			)}
		</section>
	)
}

export default ListedVans
