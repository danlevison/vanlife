import { useState } from "react"
import { Button } from "../../ui/button"
import SignInForm from "./SignInForm"

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
			<h2 className="text-center text-2xl">Sign in</h2>
			<Button
				onClick={() => setShowSignInForm(!showSignInForm)}
				className="w-full mt-2"
			>
				Continue with email
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
