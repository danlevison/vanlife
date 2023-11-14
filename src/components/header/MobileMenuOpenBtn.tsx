import { BiMenu } from "react-icons/bi"

type MobileMenuOpenBtnProps = {
	handleNav: () => void
}

export default function MobileMenuOpenBtn({
	handleNav
}: MobileMenuOpenBtnProps) {
	return (
		<button
			onClick={handleNav}
			aria-label="Open menu"
			className="md:hidden"
		>
			{<BiMenu size={30} />}
		</button>
	)
}
