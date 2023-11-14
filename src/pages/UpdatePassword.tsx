import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { updatePassword } from "@/api"
import Spinner from "@/components/Spinner"
import { FaRegCheckCircle } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function UpdatePassword() {
	const [password, setPassword] = useState("")
	const [message, setMessage] = useState("")
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			setError("")
			setLoading(true)
			await updatePassword(password)
			setMessage("Your password has been successfully reset!")
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex flex-col justify-center items-center h-full py-60 px-10">
			<h1 className="text-2xl sm:text-3xl md:text-4xl text-center">
				Update your password
			</h1>
			{message ? (
				<div className="flex flex-col justify-center items-center gap-4 mt-4">
					<FaRegCheckCircle
						size={50}
						className="text-secondaryAccent"
					/>
					<p className="text-sm text-center">{message}</p>
					<Link
						to={"/"}
						className="bg-accent rounded-lg px-6 py-2 w-full max-w-[200px] text-white text-center hover:opacity-70 duration-300"
					>
						Back to homepage
					</Link>
				</div>
			) : (
				<form
					onSubmit={handleSubmit}
					noValidate
					className="mt-6 w-full max-w-[400px]"
				>
					<Label htmlFor="password">Please enter a new password*</Label>
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
						{loading ? (
							<>
								Resetting password{" "}
								<span className="ml-2">
									<Spinner />
								</span>
							</>
						) : (
							"Reset my password"
						)}
					</Button>
				</form>
			)}
		</div>
	)
}
