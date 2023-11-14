import { AiOutlineClose } from "react-icons/ai"

type MobileMenuCloseBtnProps = {
	handleNav: () => void
}

export default function MobileMenuCloseBtn({
	handleNav
}: MobileMenuCloseBtnProps) {
	return (
		<button
			onClick={handleNav}
			aria-label="Close menu"
		>
			<AiOutlineClose size={30} />
		</button>
	)
}
