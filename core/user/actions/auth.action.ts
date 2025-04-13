import type { SupabaseClient } from "@supabase/supabase-js";

export type Credentials = {
  email: string;
  password: string;
};

export abstract class AuthAction {
  constructor(protected supabase: SupabaseClient) {}
}
