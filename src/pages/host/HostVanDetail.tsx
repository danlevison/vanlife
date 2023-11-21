import { useState, useEffect, useContext } from "react"
import { Link, NavLink, Outlet, useParams } from "react-router-dom"
import { fetchVanData } from "@/api"
import VansDataContext from "@/context/VansDataContext"
import { Badge } from "@/components/ui/badge"
import { BsArrowLeft } from "react-icons/bs"
//types
import { VanType } from "@/types/vanType"

export default function HostVanDetail() {
	const { hostVans } = useContext(VansDataContext)
	const [van, setVan] = useState<VanType | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { id } = useParams()

	const vanTypeColour = {
		simple: "bg-[#E17654]",
		rugged: "bg-[#115E59]",
		luxury: "bg-[#161616]"
	} as Record<string, string>

	const activeStyles = "font-bold border-b-2 border-black pb-1"

	useEffect(() => {
		if (id) {
			const getVan = (vanId: string) => {
				const vanDetail = hostVans?.find((van) => van.vanId === vanId)
				setVan(vanDetail ?? null)
			}
			getVan(id)
		}
	}, [id, hostVans])

	// fetch van of id(x) if host vans is null
	// e.g. if a user navigates from "/"" to "host/vans/1" without visiting the "host/vans" page where the vans data is fetched
	useEffect(() => {
		if (!hostVans && id) {
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
	}, [id, hostVans])

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
		<section className="flex flex-col w-full max-w-[1240px] mx-auto p-8">
			<div className="flex items-center gap-2 pb-2">
				<Link
					to={".."}
					relative="path"
					className="order-1 underline"
				>
					Back to all vans
				</Link>
				<BsArrowLeft />
			</div>
			{van && (
				<div className="bg-white p-5 rounded-md">
					<div className="flex flex-col sm:flex-row sm:items-center gap-5">
						<div className="flex flex-col items-start sm:order-1">
							<Badge
								className={`px-3 py-1 text-[#FFEAD0] rounded-lg text-base ${
									vanTypeColour[van.type.toLowerCase()] || "#00000"
								}`}
							>
								{van.type}
							</Badge>
							<h3 className="text-4xl py-2">{van.name}</h3>
							<h4 className="text-xl md:text-2xl">
								£{van.price}
								<span className="font-normal">/night</span>
							</h4>
						</div>
						<img
							src={van.imageURL}
							alt="/"
							className="w-full max-w-[300px] rounded-lg"
						/>
					</div>

					<nav className="py-5">
						<ul className="flex items-center gap-8">
							<li>
								<NavLink
									to="."
									end
									className={({ isActive }) =>
										isActive
											? activeStyles
											: "hover:border-b-2 hover:border-black pb-1"
									}
								>
									Details
								</NavLink>
							</li>
							<li>
								<NavLink
									to="pricing"
									className={({ isActive }) =>
										isActive
											? activeStyles
											: "hover:border-b-2 hover:border-black pb-1"
									}
								>
									Pricing
								</NavLink>
							</li>
							<li>
								<NavLink
									to="photos"
									className={({ isActive }) =>
										isActive
											? activeStyles
											: "hover:border-b-2 hover:border-black pb-1"
									}
								>
									Photos
								</NavLink>
							</li>
						</ul>
					</nav>
					<Outlet context={{ van }} />
				</div>
			)}
		</section>
	)
}
