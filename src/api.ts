import supabase from "./config/supabaseClient"

export async function fetchVansData() {
	const { data } = await supabase.from("vans").select()
	return data
}

export async function fetchVanData(id: string) {
	const { data } = await supabase.from("vans").select().eq("vanId", id)
	return data
}
