import { useState } from "react"
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover"
import SignIn from "./signIn/SignIn"
import SignUp from "./signUp/SignUp"
import ForgotPassword from "./forgotPassword/ForgotPassword"

type AuthComponentType = "SignIn" | "SignUp" | "ForgotPassword"

export default function AuthPopover() {
	const [activeComponent, setActiveComponent] =
		useState<AuthComponentType>("SignIn")

	const switchToSignIn = () => setActiveComponent("SignIn")
	const switchToSignUp = () => setActiveComponent("SignUp")
	const switchToForgotPassword = () => setActiveComponent("ForgotPassword")

	return (
		<Popover>
			<PopoverTrigger
				className="hover:text-accent"
				onClick={switchToSignIn}
			>
				Sign in
			</PopoverTrigger>
			<PopoverContent align="end">
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
			</PopoverContent>
		</Popover>
	)
}
