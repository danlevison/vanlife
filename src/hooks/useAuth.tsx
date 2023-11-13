import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"

const useAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error("useUser must be used within a AuthContextProvider.")
	}
	return context
}

export default useAuth
