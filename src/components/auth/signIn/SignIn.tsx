import { useState } from "react"
import { Button } from "../../ui/button"
import SignInForm from "./SignInForm"

type SignInProps = {
	setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SignIn({ setShowSignIn }: SignInProps) {
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
					>
						Forgot password?
					</Button>
				</>
			)}
			<div className="flex justify-center items-center">
				<p className="text-sm">Don't have an account?</p>
				<Button
					variant={"link"}
					onClick={() => setShowSignIn(false)}
				>
					Sign up
				</Button>
			</div>
		</>
	)
}
