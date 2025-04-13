import type { EmailOtpType } from "@supabase/supabase-js";
import { redirect, type LoaderFunctionArgs } from "react-router";

import { createClient } from "~/core/shared/supabase/client";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  const next = requestUrl.searchParams.get("next") || "/";
  const headers = new Headers();
  if (token_hash && type) {
    const { supabase } = createClient({ request });

    const { error, data } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    const nextUrl = new URL(next);
    const username = data.user?.user_metadata.username;

    nextUrl.searchParams.set("username", username);

    if (!error) {
      return redirect(nextUrl.toString(), { headers });
    }
  }
  return redirect("/login", { headers });
};
