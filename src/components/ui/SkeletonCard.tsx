import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardFooter } from "@/components/ui/card"

export default function SkeletonCard() {
	return (
		<Card>
			<Skeleton className="w-full h-[300px]" />
			<div className="flex justify-between py-3 px-2">
				<Skeleton className="w-44 h-6" />
				<Skeleton className="w-24 h-6" />
			</div>
			<CardFooter className="flex justify-end p-2">
				<Skeleton className="w-[64px] h-[34px] rounded-lg" />
			</CardFooter>
		</Card>
	)
}
