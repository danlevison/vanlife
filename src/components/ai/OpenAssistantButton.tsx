import { BsFillChatSquareDotsFill } from "react-icons/bs"

type OpenAssistantButtonType = {
	handleOpenAssistant: () => void
}
export default function OpenAssistantButton({
	handleOpenAssistant
}: OpenAssistantButtonType) {
	return (
		<div className="hidden md:block fixed bottom-2 right-5">
			<button onClick={handleOpenAssistant}>
				<BsFillChatSquareDotsFill
					size={50}
					className="text-accent hover:text-accent/80"
				/>
			</button>
		</div>
	)
}
