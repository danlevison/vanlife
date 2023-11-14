import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { updatePassword } from "@/api"

export default function UpdatePassword() {
	const [password, setPassword] = useState("")
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			setError("")
			setLoading(true)
			await updatePassword(password)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex flex-col items-center min-h-screen py-20 px-10">
			<h1 className="text-2xl sm:text-3xl md:text-4xl text-center">
				Update your password
			</h1>
			<form
				onSubmit={handleSubmit}
				noValidate
				className="mt-6 w-full max-w-[400px]"
			>
				<Label htmlFor="password">Password</Label>
				<Input
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					type="password"
					id="password"
					name="password"
					required
					className={`bg-transparent mb-2 ${
						error === "Please enter a valid password" && "border-red-500 mb-0"
					}`}
				/>
				{error === "Please enter a valid password" && (
					<p className="text-sm text-red-500 mb-1">{error}</p>
				)}
				<Button
					disabled={loading || !password}
					className="w-full"
				>
					Reset my password
				</Button>
			</form>
		</div>
	)
}
