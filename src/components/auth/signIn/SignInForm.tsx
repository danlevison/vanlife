import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"

export default function SignInForm() {
	return (
		<form className="mt-2">
			<Label htmlFor="signInEmail">Email</Label>
			<Input
				type="email"
				id="signInEmail"
				name="signInEmail"
				required
				className="bg-transparent mb-2"
			/>
			<Label htmlFor="signInPassword">Password</Label>
			<Input
				type="password"
				id="signInPassword"
				name="signInPassword"
				required
				className="bg-transparent mb-4"
			/>
			<Button className="w-full">Sign in</Button>
		</form>
	)
}
