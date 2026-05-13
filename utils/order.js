import { supabase }
from "./supabase.js";

export async function createOrder(data) {

  return await supabase
    .from("orders")
    .insert([data]);
}
