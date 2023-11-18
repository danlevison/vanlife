import ReasonsToListGrid from "@/components/listCampervan/ReasonsToListGrid"
import HowToList from "@/components/listCampervan/HowToList"
import CardImageGrid from "@/components/listCampervan/CardImageGrid"
import Questions from "@/components/listCampervan/Questions"

export default function listCampervan() {
	return (
		<div className="flex flex-col items-center min-h-screen px-8">
			<div className="max-w-[1440px] pt-28">
				<CardImageGrid />
				<ReasonsToListGrid />
				<HowToList />
			</div>
			<Questions />
		</div>
	)
}
