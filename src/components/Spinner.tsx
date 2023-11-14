import { Loader2 } from "lucide-react"

export default function Spinner() {
	const Icons = {
		spinner: Loader2
	}
	return <Icons.spinner className="h-4 w-4 animate-spin" />
}
