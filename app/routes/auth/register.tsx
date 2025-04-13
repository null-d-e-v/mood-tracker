import { AuthError } from "@supabase/supabase-js";
import { ChevronLeft, LoaderCircle } from "lucide-react";
import {
  Form,
  Link,
  redirect,
  useNavigation,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "react-router";

import { LoginActionType } from "~/client/shared/auth/login-action-types";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { createClient } from "~/core/shared/supabase/client";
import { SignInAction } from "~/core/user/actions/signin.action";

import type { Route } from ".react-router/types/app/routes/auth/+types/login";

export const meta: MetaFunction = () => [
  { title: "Register" },
  { name: "description", content: "Register page for MoodTrack" },
];

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const data = Object.fromEntries(form);

  const { supabase, headers } = createClient({ request });

  const credentials = {
    email: data.email.toString() ?? "",
    password: data.password.toString() ?? "",
  };

  try {
    const signin = new SignInAction(supabase);
    await signin.execute(credentials);
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.message };
    }

    throw error;
  }

  return redirect(`/login?action=${LoginActionType.REMEMBER}`, { headers });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase } = createClient({ request });
  const { data, error } = await supabase.auth.getUser();

  if (data && data.user && !error) {
    return redirect("/");
  }

  return {};
};

export default function Page({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="min-w-lg">
        <CardHeader>
          <CardTitle>
            <Button variant="secondary" size="icon" asChild className="mr-2">
              <Link to="/login">
                <ChevronLeft />
              </Link>
            </Button>
            Crear cuenta en MoodTrack
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form method="POST" className="flex flex-col items-center gap-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input name="email" id="email" type="email" required></Input>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                name="password"
                id="password"
                type="password"
                required
              ></Input>
            </div>

            {actionData && actionData.error ? (
              <p className="text-rose-500 mt-2">{actionData.error}</p>
            ) : null}

            <div className="w-full max-w-sm flex flex-col gap-2 mt-4">
              <Button type="submit" className="w-full">
                {navigation.formAction === "/register" ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Crear Cuenta"
                )}
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
