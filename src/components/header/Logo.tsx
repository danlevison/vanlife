import React from "react"
import { Link } from "react-router-dom"

type LogoProps = {
	setNav: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Logo({ setNav }: LogoProps) {
	return (
		<Link
			onClick={() => setNav(false)}
			to="/"
			className="text-primaryText text-2xl font-bold uppercase"
		>
			#VanLife
		</Link>
	)
}
