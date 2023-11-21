import incomeGraph from "@/assets/income-graph.png"

export default function Income() {
	const transactionsData = [
		{ amount: 720, date: "Jan 3, '23", id: "1" },
		{ amount: 560, date: "Dec 12, '22", id: "2" },
		{ amount: 980, date: "Dec 3, '22", id: "3" }
	]
	return (
		<section className="flex flex-col p-8 max-w-[1240px] mx-auto">
			<h1 className="text-2xl sm:text-3xl md:text-4xl">Income</h1>
			<p className="text-sm sm:text-base py-4">
				Last <span className="font-bold underline">30 days</span>
			</p>
			<h2 className="text-2xl sm:text-3xl">£2,260</h2>
			<img
				src={incomeGraph}
				alt="Income graph"
				className="w-full max-w-[400px] py-6"
			/>
			<div className="flex justify-between items-center gap-5 pb-1">
				<h3 className="text-lg sm:text-xl md:text-2xl">
					Your transactions (3)
				</h3>
				<p>
					Last <span className="font-bold underline">30 days</span>
				</p>
			</div>
			<ol className="flex flex-col gap-5">
				{transactionsData.map((item) => (
					<li
						key={item.id}
						className="flex justify-between items-center bg-white p-5 rounded-md"
					>
						<h3 className="text-lg">£{item.amount}</h3>
						<p>{item.date}</p>
					</li>
				))}
			</ol>
		</section>
	)
}
