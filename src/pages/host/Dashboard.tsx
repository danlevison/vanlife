import ListedVans from "@/components/host/dashboard/ListedVans"
import IncomeOverview from "@/components/host/dashboard/IncomeOverview"
import ReviewsOverview from "@/components/host/dashboard/ReviewsOverview"

export default function Dashboard() {
	return (
		<div className="flex flex-col p-8">
			<IncomeOverview />

			<ReviewsOverview />

			<ListedVans />
		</div>
	)
}
