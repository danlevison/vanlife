import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa"

export default function ReviewsOverview() {
	return (
		<section className="flex flex-col xs:flex-row xs:justify-between xs:items-center w-full max-w-[1240px] mx-auto bg-[#FFDDB2] p-4 rounded-b-md">
			<h2 className="flex items-center gap-3 text-lg">
				Review score{" "}
				<span className="flex items-center">
					<FaStar
						size={16}
						className="text-orange-400 mr-1"
					/>
					5.0<span className="font-normal text-">/5</span>
				</span>
			</h2>
			<Link
				to="reviews"
				className="text-sm sm:text-base"
			>
				Details
			</Link>
		</section>
	)
}
