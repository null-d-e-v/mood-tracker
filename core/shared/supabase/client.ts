import {
  createServerClient,
  serializeCookieHeader,
  type CookieMethodsServer,
} from "@supabase/ssr";

const parseCookies = ({ request }: { request: Request }) => {
  const cookieHeader = request.headers.get("Cookie") ?? "";
  if (!cookieHeader) return [];

  return cookieHeader.split(";").map((cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    return {
      name,
      value: decodeURIComponent(rest.join("=")),
    };
  });
};

export const createClient = ({ request }: { request: Request }) => {
  const headers = new Headers();

  const cookies: CookieMethodsServer = {
    getAll() {
      return parseCookies({ request });
    },
    setAll(cookiesToSet) {
      cookiesToSet.forEach(({ name, value, options }) => {
        headers.append(
          "Set-Cookie",
          serializeCookieHeader(name, value, options),
        );
      });
    },
  };

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!,
    {
      cookies,
    },
  );

  return { supabase, headers };
};
