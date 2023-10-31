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
					description: string
					hostId: string
					id: number
					imageURL: string
					name: string
					price: string
					type: string
					vanId: string
				}
				Insert: {
					created_at?: string
					description?: string
					hostId?: string
					id?: number
					imageURL?: string
					name?: string
					price?: string
					type?: string
					vanId?: string
				}
				Update: {
					created_at?: string
					description?: string
					hostId?: string
					id?: number
					imageURL?: string
					name?: string
					price?: string
					type?: string
					vanId?: string
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
