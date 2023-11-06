import SkeletonCard from "./ui/SkeletonCard"

export default function Loading() {
	return (
		<div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-center items-center gap-10 w-full">
			{"abcdefghi".split("").map((i) => (
				<SkeletonCard key={i} />
			))}
		</div>
	)
}
