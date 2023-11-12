import { useState } from "react"
import { Button } from "../../ui/button"
import SignUpForm from "./SignUpForm"

type SignUpProps = {
	setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SignUp({ setShowSignIn }: SignUpProps) {
	const [showSignUpForm, setShowSignUpForm] = useState(false)

	return (
		<>
			<h2 className="text-center text-2xl">Sign up</h2>
			<Button
				onClick={() => setShowSignUpForm(!showSignUpForm)}
				className="w-full mt-2"
			>
				Continue with email
			</Button>
			{showSignUpForm && <SignUpForm />}
			<div className="flex justify-center items-center">
				<p className="text-sm">Already have an account?</p>
				<Button
					onClick={() => setShowSignIn(true)}
					variant={"link"}
				>
					Sign in
				</Button>
			</div>
		</>
	)
}
