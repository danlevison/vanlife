import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardFooter } from "@/components/ui/card"

export default function SkeletonCard() {
	return (
		<Card className="flex flex-col w-full min-h-[312px]">
			<div className="w-full flex flex-grow min-h-[312px]">
				<Skeleton className="w-full" />
			</div>
			<div className="w-full h-[95px] flex-none">
				<div className="flex justify-between py-3 px-2">
					<Skeleton className="w-44 h-6" />
					<Skeleton className="w-24 h-6" />
				</div>
				<CardFooter className="flex justify-end p-2 h-[34px]">
					<Skeleton className="w-[64px] h-[34px] rounded-lg" />
				</CardFooter>
			</div>
		</Card>
	)
}
