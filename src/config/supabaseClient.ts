import { createClient } from "@supabase/supabase-js"
import { Database } from "../types/supabase.mts"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_ANON_KEY
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase
