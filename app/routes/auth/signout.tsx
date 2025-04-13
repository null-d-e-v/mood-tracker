import { redirect, type ActionFunctionArgs } from "react-router";

import { createClient } from "~/core/shared/supabase/client";
import { LogoutAction } from "~/core/user/actions/logout.action";
import { withAuth } from "~/core/user/middlewares/auth";

export const action = withAuth(async ({ request }: ActionFunctionArgs) => {
  const { supabase, headers } = createClient({ request });
  const logout = new LogoutAction(supabase);

  await logout.execute();

  return redirect("/login", { headers });
});

export const loader = () => {
  return redirect("/");
};
