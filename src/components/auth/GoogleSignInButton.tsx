import { signInWithGoogle } from "@/api"
import { FcGoogle } from "react-icons/fc"

export default function GoogleSignInButton() {
	return (
		<button
			onClick={signInWithGoogle}
			className="flex justify-center items-center gap-2 w-full border border-gray-500 h-10 px-4 py-2 rounded-md hover:bg-gray-100 text-sm mt-2"
		>
			<FcGoogle size={25} />
			<span>Continue with Google</span>
		</button>
	)
}
