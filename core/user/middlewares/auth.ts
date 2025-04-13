import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";

import { createClient } from "~/core/shared/supabase/client";

const requireLoginMiddleware = async ({ request }: { request: Request }) => {
  const { supabase } = createClient({ request });
  const { error } = await supabase.auth.getUser();

  if (error) {
    return redirect("/login");
  }
};

export const withAuth = <T>(
  fn: (params: LoaderFunctionArgs | ActionFunctionArgs) => Promise<T>,
) => {
  return async function (params: LoaderFunctionArgs | ActionFunctionArgs) {
    const error = await requireLoginMiddleware({ request: params.request });
    if (error) {
      return error;
    }
    return await fn(params);
  };
};
