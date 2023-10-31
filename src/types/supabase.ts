export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export interface Database {
	public: {
		Tables: {
			vans: {
				Row: {
					created_at: string
					description: string | null
					hostId: string | null
					id: number
					imageURL: string | null
					name: string | null
					price: string | null
					type: string | null
					vanId: string | null
				}
				Insert: {
					created_at?: string
					description?: string | null
					hostId?: string | null
					id?: number
					imageURL?: string | null
					name?: string | null
					price?: string | null
					type?: string | null
					vanId?: string | null
				}
				Update: {
					created_at?: string
					description?: string | null
					hostId?: string | null
					id?: number
					imageURL?: string | null
					name?: string | null
					price?: string | null
					type?: string | null
					vanId?: string | null
				}
				Relationships: []
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}
