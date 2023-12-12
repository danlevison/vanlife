import { useState } from "react"
import { Link } from "react-router-dom"
import image from "@/assets/sign-in-img.jpg"
import SignIn from "@/components/auth/signIn/SignIn"
import SignUp from "@/components/auth/signUp/SignUp"
import ForgotPassword from "@/components/auth/forgotPassword/ForgotPassword"

type AuthComponentType = "SignIn" | "SignUp" | "ForgotPassword"

export default function SignInPage() {
	const [activeComponent, setActiveComponent] =
		useState<AuthComponentType>("SignIn")
	const switchToSignIn = () => setActiveComponent("SignIn")
	const switchToSignUp = () => setActiveComponent("SignUp")
	const switchToForgotPassword = () => setActiveComponent("ForgotPassword")
	return (
		<>
			<Link
				to="/"
				className="absolute top-4 left-8 text-2xl uppercase font-bold"
			>
				#Vanlife
			</Link>
			<div className="lg:grid grid-cols-2">
				<div className="flex flex-col items-center py-36 px-8">
					<div className="w-full md:w-[350px]">
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
					</div>
				</div>
				<div>
					<img
						src={image}
						alt="/"
						className="hidden lg:block h-screen w-full"
						style={{ objectFit: "cover" }}
					/>
				</div>
			</div>
		</>
	)
}
