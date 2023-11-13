import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import SignIn from "./signIn/SignIn"
import SignUp from "./signUp/SignUp"

type AuthModalType = {
	showSignIn: boolean
	setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AuthModal({
	showSignIn,
	setShowSignIn
}: AuthModalType) {
	return (
		<Dialog>
			<DialogTrigger onClick={() => setShowSignIn(true)}>Sign in</DialogTrigger>
			<DialogContent className="block max-w-full h-full bg-white">
				{showSignIn ? (
					<SignIn setShowSignIn={setShowSignIn} />
				) : (
					<SignUp setShowSignIn={setShowSignIn} />
				)}
			</DialogContent>
		</Dialog>
	)
}
