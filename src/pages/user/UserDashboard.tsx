import { Link } from "react-router-dom"
import { LiaShuttleVanSolid } from "react-icons/lia"
import { BsPersonVcard } from "react-icons/bs"
import useAuth from "@/hooks/useAuth"

export default function UserDashboard() {
	const { user } = useAuth()

	return (
		<div className="flex flex-col items-center w-full min-h-screen">
			<div className="py-40 px-10 max-w-[1240px]">
				<div>
					<h1 className="text-3xl md:text-4xl">
						<span className="text-lg md:text-xl font-normal">Hello, </span>
						{user?.user_metadata.name}
					</h1>
					<p className="pt-2">
						Access your hosted vans and your account settings below
					</p>
				</div>

				<div className="flex flex-col md:flex-row md:items-center gap-10 pt-10">
					<Link
						to={"/host"}
						className="hover:scale-[1.02] duration-300"
					>
						<div className="flex flex-col justify-center p-5 rounded-lg bg-white shadow-lg sm:w-[350px] h-[200px]">
							<LiaShuttleVanSolid
								size={50}
								className="text-secondaryAccent"
							/>
							<h2 className="text-2xl py-2">Hosted vans</h2>
							<p>Review and update your listed vans</p>
						</div>
					</Link>
					<Link
						to={"details"}
						className="hover:scale-[1.02] duration-300"
					>
						<div className="flex flex-col justify-center p-5 rounded-lg bg-white shadow-lg sm:w-[350px] h-[200px]">
							<BsPersonVcard
								size={50}
								className="text-secondaryAccent"
							/>
							<h2 className="text-2xl py-2">Account details</h2>
							<p>Review and update your personal details</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
	)
}
