import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import SignIn from "./signIn/SignIn"
import SignUp from "./signUp/SignUp"
import { AiOutlineUser } from "react-icons/ai"
import { CiLogin } from "react-icons/ci"
import ForgotPassword from "./forgotPassword/ForgotPassword"

type AuthComponentType = "SignIn" | "SignUp" | "ForgotPassword"

export default function AuthModal() {
	const [activeComponent, setActiveComponent] =
		useState<AuthComponentType>("SignIn")

	const switchToSignIn = () => setActiveComponent("SignIn")
	const switchToSignUp = () => setActiveComponent("SignUp")
	const switchToForgotPassword = () => setActiveComponent("ForgotPassword")

	return (
		<Dialog>
			<div className="flex flex-col items-start gap-4">
				<DialogTrigger
					onClick={switchToSignIn}
					className="flex items-center gap-4 hover:text-accent"
				>
					<CiLogin size={25} />
					<p>Sign in</p>
				</DialogTrigger>
				<DialogTrigger
					onClick={switchToSignUp}
					className="flex items-center gap-4 hover:text-accent"
				>
					<AiOutlineUser size={25} />
					<p>Create account</p>
				</DialogTrigger>
			</div>

			<DialogContent className="block max-w-full h-full bg-white">
				{activeComponent === "SignIn" && (
					<SignIn
						switchToSignUp={switchToSignUp}
						switchToForgotPassword={switchToForgotPassword}
					/>
				)}
				{activeComponent === "SignUp" && (
					<SignUp switchToSignIn={switchToSignIn} />
				)}
				{activeComponent === "ForgotPassword" && (
					<ForgotPassword switchToSignIn={switchToSignIn} />
				)}
			</DialogContent>
		</Dialog>
	)
}
