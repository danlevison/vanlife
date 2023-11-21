import supabase from "./config/supabaseClient"

export async function fetchVansData() {
	const { data } = await supabase.from("vans").select()
	return data
}

export async function fetchHostVansData() {
	const { data } = await supabase
		.from("vans")
		.select()
		.not("hostId", "is", null)
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
				name: name,
				country: "",
				date_of_birth: "",
				phone: ""
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

export async function signInWithGoogle() {
	const { data } = await supabase.auth.signInWithOAuth({
		provider: "google"
	})

	return data
}

export async function sendResetPasswordEmail(email: string) {
	const { data } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: "https://yourvanlife.netlify.app/update-password"
	})
	return data
}

export async function updatePassword(newPassword: string) {
	const { data } = await supabase.auth.updateUser({
		password: newPassword
	})
	return data
}
