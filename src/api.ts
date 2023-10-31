import supabase from "./config/supabaseClient"

export async function fetchVanData() {
	const { data } = await supabase.from("vans").select()

	return data
}
