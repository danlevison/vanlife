import { Button } from "../../ui/button"
import ForgotPasswordForm from "./ForgotPasswordForm"

type ForgotPasswordProps = {
	switchToSignIn: () => void
}

export default function ForgotPassword({
	switchToSignIn
}: ForgotPasswordProps) {
	return (
		<>
			<h2 className="text-center text-2xl">Reset password</h2>
			<div className="flex flex-col justify-center items-center">
				<ForgotPasswordForm />
				<div className="flex justify-center items-center">
					<p className="text-sm">Already have an account?</p>
					<Button
						onClick={switchToSignIn}
						variant={"link"}
					>
						Sign in
					</Button>
				</div>
			</div>
		</>
	)
}
