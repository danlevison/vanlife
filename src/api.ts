import supabase from "./config/supabaseClient"

export async function fetchVansData() {
	const { data } = await supabase.from("vans").select()
	return data
}
