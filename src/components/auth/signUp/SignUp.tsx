import { useState } from "react"
import { Button } from "../../ui/button"
import { MdOutlineEmail } from "react-icons/md"
import SignUpForm from "./SignUpForm"
import GoogleSignInButton from "../GoogleSignInButton"

type SignUpProps = {
	switchToSignIn: () => void
}

export default function SignUp({ switchToSignIn }: SignUpProps) {
	const [showSignUpForm, setShowSignUpForm] = useState(false)
	const [signedUp, setSignedUp] = useState(false)

	return signedUp ? (
		<div className="flex flex-col justify-center">
			<h2 className="text-center text-2xl">You have signed up successfully!</h2>
			<p className="text-center mt-2">
				Please check your email to verify your account.
			</p>
			<Button
				onClick={switchToSignIn}
				variant={"link"}
			>
				Click here to sign in
			</Button>
		</div>
	) : (
		<>
			<h2 className="text-center text-2xl pb-3">Sign up</h2>
			<GoogleSignInButton />
			<Button
				onClick={() => setShowSignUpForm(!showSignUpForm)}
				className="flex justify-center items-center gap-2 w-full mt-2"
			>
				<MdOutlineEmail size={25} />
				<span>Continue with email</span>
			</Button>
			{showSignUpForm && <SignUpForm setSignedUp={setSignedUp} />}
			<div className="flex justify-center items-center">
				<p className="text-sm">Already have an account?</p>
				<Button
					onClick={switchToSignIn}
					variant={"link"}
				>
					Sign in
				</Button>
			</div>
		</>
	)
}
