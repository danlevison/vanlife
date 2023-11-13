import supabase from "./config/supabaseClient"

export async function fetchVansData() {
	const { data } = await supabase.from("vans").select()
	return data
}

export async function fetchVanData(id: string) {
	const { data } = await supabase.from("vans").select().eq("vanId", id)
	return data
}

export async function signUpNewUser(
	name: string,
	email: string,
	password: string
) {
	const { data } = await supabase.auth.signUp({
		email: email,
		password: password,
		options: {
			emailRedirectTo: "https://yourvanlife.netlify.app/",
			data: {
				first_name: name
			}
		}
	})
	return data
}

export async function signInUser(email: string, password: string) {
	const { data } = await supabase.auth.signInWithPassword({
		email: email,
		password: password
	})
	return data
}
