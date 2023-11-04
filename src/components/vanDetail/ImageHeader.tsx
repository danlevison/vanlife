import { VanType } from "@/types/vanType"

type ImageHeaderType = {
	van: VanType
}

export default function ImageHeader({ van }: ImageHeaderType) {
	return (
		<div className="grid md:grid-cols-3 grid-flow-row grid-">
			<img
				src={van?.imageURL}
				alt="/"
				className="md:h-[500px] w-full rounded-lg col-start-1 col-end-3"
				style={{ objectFit: "cover", objectPosition: "center" }}
			/>
			<div>
				<img
					src={van?.imageURL}
					alt="/"
					className="hidden md:block h-[250px] w-full rounded-lg"
					style={{ objectFit: "cover", objectPosition: "center" }}
				/>
				<img
					src={van?.imageURL}
					alt="/"
					className="hidden md:block h-[250px] w-full rounded-lg"
					style={{ objectFit: "cover", objectPosition: "center" }}
				/>
			</div>
		</div>
	)
}
