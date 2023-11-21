import { BsStarFill } from "react-icons/bs"
import reviewGraph from "@/assets/review-graph.png"

export default function Reviews() {
	const reviewsData = [
		{
			rating: 5,
			name: "Elliot",
			date: "January 3, 2023",
			text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
			id: "1"
		},
		{
			rating: 5,
			name: "Sandy",
			date: "December 12, 2022",
			text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
			id: "2"
		}
	]

	return (
		<section className="flex flex-col p-8 max-w-[1240px] mx-auto">
			<div className="flex items-end gap-4">
				<h1 className="text-2xl sm:text-3xl md:text-4xl">Your reviews</h1>
				<p className="text-sm sm:text-base">
					Last <span className="font-bold underline">30 days</span>
				</p>
			</div>
			<img
				src={reviewGraph}
				alt="Review graph"
				className="w-full max-w-[400px] py-7"
			/>
			<h3>Reviews (2)</h3>
			{reviewsData.map((review) => (
				<div key={review.id}>
					<div className="pb-4">
						<div className="flex items-end py-4">
							{[...Array(review.rating)].map((_, i) => (
								<BsStarFill
									key={i}
									className="text-orange-400"
								/>
							))}
						</div>

						<div className="flex items-center gap-4">
							<p className="font-bold">{review.name}</p>
							<p className="text-gray-500">{review.date}</p>
						</div>
						<p className="max-w-[600px]">{review.text}</p>
					</div>
					<hr />
				</div>
			))}
		</section>
	)
}
