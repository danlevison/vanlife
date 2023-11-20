import { useState } from "react"
import { Button } from "../../ui/button"
import { MdOutlineEmail } from "react-icons/md"
import SignInForm from "./SignInForm"
import GoogleSignInButton from "../GoogleSignInButton"

type SignInProps = {
	switchToSignUp: () => void
	switchToForgotPassword: () => void
}

export default function SignIn({
	switchToSignUp,
	switchToForgotPassword
}: SignInProps) {
	const [showSignInForm, setShowSignInForm] = useState(false)
	return (
		<>
			<h2 className="text-center text-2xl pb-3">Sign in</h2>
			<GoogleSignInButton />
			<Button
				onClick={() => setShowSignInForm(!showSignInForm)}
				className="flex justify-center items-center gap-2 w-full mt-2"
			>
				<MdOutlineEmail size={25} />
				<span>Continue with email</span>
			</Button>
			{showSignInForm && (
				<>
					<SignInForm />
					<Button
						variant={"link"}
						className="mx-auto w-full"
						onClick={switchToForgotPassword}
					>
						Forgot password?
					</Button>
				</>
			)}
			<div className="flex justify-center items-center">
				<p className="text-sm">Don't have an account?</p>
				<Button
					variant={"link"}
					onClick={switchToSignUp}
				>
					Sign up
				</Button>
			</div>
		</>
	)
}
