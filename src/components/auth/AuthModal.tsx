import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import SignIn from "./signIn/SignIn"
import SignUp from "./signUp/SignUp"
import { AiOutlineUser } from "react-icons/ai"
import { CiLogin } from "react-icons/ci"

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
			<div className="flex flex-col items-start gap-4">
				<DialogTrigger
					onClick={() => setShowSignIn(true)}
					className="flex items-center gap-4 hover:text-accent"
				>
					<CiLogin size={25} />
					<p>Sign in</p>
				</DialogTrigger>
				<DialogTrigger
					onClick={() => setShowSignIn(false)}
					className="flex items-center gap-4 hover:text-accent"
				>
					<AiOutlineUser size={25} />
					<p>Create account</p>
				</DialogTrigger>
			</div>

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
