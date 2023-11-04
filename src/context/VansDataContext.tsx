import { useState, createContext } from "react"
import { VanType } from "@/types/vanType"

type VansDataContextType = {
	vans: VanType[] | null
	setVans: React.Dispatch<React.SetStateAction<VanType[] | null>>
}

const initialVansContextValue: VansDataContextType = {
	vans: null,
	setVans: () => null
}

const VansDataContext = createContext<VansDataContextType>(
	initialVansContextValue
)

export function VansDataProvider({ children }: { children: React.ReactNode }) {
	const [vans, setVans] = useState<VanType[] | null>(null)
	return (
		<VansDataContext.Provider value={{ vans, setVans }}>
			{children}
		</VansDataContext.Provider>
	)
}

export default VansDataContext
