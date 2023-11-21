import { Link } from "react-router-dom"
import useAuth from "@/hooks/useAuth"

export default function IncomeOverview() {
	const { user } = useAuth()
	return (
		<section className="w-full max-w-[1240px] mx-auto bg-[#FFEAD0] p-4 rounded-t-md">
			<h1 className="text-2xl sm:text-3xl md:text-4xl">
				Welcome, {user?.user_metadata.name}!
			</h1>
			<div className="flex flex-col xs:flex-row xs:justify-between xs:items-center py-4">
				<p className="text-sm sm:text-base">
					Income last <span className="font-bold underline">30 days</span>
				</p>
				<Link
					to="income"
					className="text-sm sm:text-base"
				>
					Details
				</Link>
			</div>
			<h2 className="text-2xl sm:text-3xl">£2,260</h2>
		</section>
	)
}
