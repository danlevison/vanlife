import { useState } from "react"
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover"
import SignIn from "./signIn/SignIn"
import SignUp from "./signUp/SignUp"

export default function AuthPopover() {
	const [showSignIn, setShowSignIn] = useState(true)

	return (
		<Popover>
			<PopoverTrigger
				className="hover:text-accent"
				onClick={() => setShowSignIn(true)}
			>
				Sign in
			</PopoverTrigger>
			<PopoverContent>
				{showSignIn ? (
					<SignIn setShowSignIn={setShowSignIn} />
				) : (
					<SignUp setShowSignIn={setShowSignIn} />
				)}
			</PopoverContent>
		</Popover>
	)
}
