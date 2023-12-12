import { useContext, useEffect, useState } from "react"
import VansDataContext from "@/context/VansDataContext"
import { fetchVanData } from "@/api"
import { useParams, Link, useLocation } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs"
import Overview from "@/components/vanDetail/Overview"
import ImageHeader from "@/components/vanDetail/ImageHeader"
import Description from "@/components/vanDetail/Description"
import Features from "@/components/vanDetail/Features"
import Details from "@/components/vanDetail/Details"
import Rules from "@/components/vanDetail/Rules"
import CheckAvailability from "@/components/vanDetail/vanAvailability/CheckAvailability"
import Cancellation from "@/components/vanDetail/Cancellation"
//types
import { VanType } from "@/types/vanType"

export default function VanDetail() {
	const { vans } = useContext(VansDataContext)
	const [van, setVan] = useState<VanType | null>(null)
	const { id } = useParams()
	const { state } = useLocation()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const search = state?.search || ""

	useEffect(() => {
		if (id) {
			const getVan = (vanId: string) => {
				const vanDetail = vans?.find((van) => van.vanId === vanId)
				setVan(vanDetail ?? null)
			}
			getVan(id)
		}
	}, [id, vans])

	// fetch van of id(x) if vans is null
	// e.g. if a user navigates from "/"" to "/vans/1" without visiting the "/vans" page where the vans data is fetched
	useEffect(() => {
		if (!vans && id) {
			const loadVan = async () => {
				setLoading(true)
				setError(null)
				try {
					const data = await fetchVanData(id)
					data?.map((van) => setVan(van))
				} catch (error) {
					console.error(error)
					setError("It looks like something went wrong!")
				} finally {
					setLoading(false)
				}
			}
			loadVan()
		}
	}, [id, vans])

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
				<Link
					to={"/vans"}
					className="px-3 py-2 bg-[#161616] text-white rounded-lg font-semibold"
				>
					Please try again
				</Link>
			</div>
		)
	}

	return (
		<div className="min-h-screen mx-auto px-8 pt-24">
			<div className="flex items-center gap-2 pb-2">
				<Link
					to={`..${search}`}
					relative="path"
					className="order-1 underline"
				>
					Back to all vans
				</Link>
				<BsArrowLeft />
			</div>

			{van !== null && <ImageHeader van={van} />}

			{van && (
				<div className="w-full max-w-[1240px] mx-auto py-4">
					<div className="grid grid-cols-1 lg:grid-cols-2">
						<div className="w-full lg:max-w-[650px]">
							<Overview van={van} />
							<Description van={van} />
							<Features van={van} />
							<Details van={van} />
							<Rules van={van} />
							<Cancellation />
						</div>
						<div className="flex justify-center items-start w-full pt-16">
							<CheckAvailability van={van} />
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
