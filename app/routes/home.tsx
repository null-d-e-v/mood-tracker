import { Form } from "react-router";

import { getPageTitle } from "~/client/shared/page/title";
import { createClient } from "~/core/shared/supabase/client";
import { withAuth } from "~/core/user/middlewares/auth";

import type { Route } from "./+types/home";

export function meta() {
  return [
    { title: getPageTitle({ title: "Inicio" }) },
    { name: "description", content: "CodeHive Template" },
  ];
}

export const loader = withAuth(async ({ request }: Route.LoaderArgs) => {
  const { supabase } = createClient({ request });
  const { data } = await supabase.auth.getUser();
  return { username: data.user?.user_metadata.username };
});

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main className="p-8">
      {loaderData.username}
      <Form action="/signout" method="POST">
        <button type="submit">SignOut</button>
      </Form>
    </main>
  );
}
