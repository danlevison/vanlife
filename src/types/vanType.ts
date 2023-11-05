import { Json } from "./supabase"

export interface VehicleDetails {
	Engine: string
	Height: string
	Length: string
	Make: string
	Model: string
	Transmission: string
	Type: string
	Width: string
	Year: string
}

export type VanType = {
	created_at: string
	features: string[]
	hostId: string
	id: number
	imageURL: string
	name: string
	overview: string[]
	price: string
	type: string
	vanId: string
	vehicle_description: string[]
	vehicle_details: Json | VehicleDetails
	vehicle_rules: string[]
}