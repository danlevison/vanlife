import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover"
import SignIn from "./signIn/SignIn"
import SignUp from "./signUp/SignUp"

type AuthPopoverType = {
	showSignIn: boolean
	setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AuthPopover({
	showSignIn,
	setShowSignIn
}: AuthPopoverType) {
	return (
		<Popover>
			<PopoverTrigger
				className="hover:text-accent"
				onClick={() => setShowSignIn(true)}
			>
				Sign in
			</PopoverTrigger>
			<PopoverContent align="end">
				{showSignIn ? (
					<SignIn setShowSignIn={setShowSignIn} />
				) : (
					<SignUp setShowSignIn={setShowSignIn} />
				)}
			</PopoverContent>
		</Popover>
	)
}
