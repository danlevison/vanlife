import { useState, createContext } from "react"
import { VanType } from "@/types/vanType"

type VansDataContextType = {
	vans: VanType[] | null
	setVans: React.Dispatch<React.SetStateAction<VanType[] | null>>
	hostVans: VanType[] | null
	setHostVans: React.Dispatch<React.SetStateAction<VanType[] | null>>
}

const initialVansContextValue: VansDataContextType = {
	vans: null,
	setVans: () => null,
	hostVans: null,
	setHostVans: () => null
}

const VansDataContext = createContext<VansDataContextType>(
	initialVansContextValue
)

export function VansDataProvider({ children }: { children: React.ReactNode }) {
	const [vans, setVans] = useState<VanType[] | null>(null)
	const [hostVans, setHostVans] = useState<VanType[] | null>(null)
	return (
		<VansDataContext.Provider value={{ vans, setVans, hostVans, setHostVans }}>
			{children}
		</VansDataContext.Provider>
	)
}

export default VansDataContext
