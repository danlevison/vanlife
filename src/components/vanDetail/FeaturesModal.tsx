import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog"
// types
import { VanType } from "@/types/vanType"

type FeaturesModalProps = {
	van: VanType
}

export default function FeaturesModal({ van }: FeaturesModalProps) {
	return (
		<Dialog>
			<DialogTrigger className="text-accent flex gap-1 hover:bg-[#FFEAD0] p-2 rounded-lg mt-5">
				Show more features
			</DialogTrigger>
			<DialogContent className="overflow-auto h-[80%] w-[80%] bg-white">
				<DialogHeader>
					<DialogTitle className="mb-5 text-xl">Included features</DialogTitle>
					<ul className="flex flex-col gap-4 overflow-auto">
						{van.features.map((feature) => (
							<li
								key={feature}
								className="border-b border-black py-2 last-of-type:border-none"
							>
								{feature}
							</li>
						))}
					</ul>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
