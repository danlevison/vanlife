import ListedVans from "@/components/host/ListedVans"
import IncomeOverview from "@/components/host/IncomeOverview"
import ReviewsOverview from "@/components/host/ReviewsOverview"

export default function Dashboard() {
	return (
		<div className="flex flex-col p-8">
			<IncomeOverview />
			<ReviewsOverview />
			<ListedVans />
		</div>
	)
}
