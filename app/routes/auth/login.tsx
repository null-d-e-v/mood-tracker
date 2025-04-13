import { AuthError } from "@supabase/supabase-js";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import {
  Form,
  Link,
  redirect,
  useNavigation,
  useSearchParams,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "react-router";
import { toast } from "sonner";

import { LoginActionType } from "~/client/shared/auth/login-action-types";
import { getPageTitle } from "~/client/shared/page/title";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { createClient } from "~/core/shared/supabase/client";
import { LoginAction } from "~/core/user/actions/login.action";

import type { Route } from ".react-router/types/app/routes/auth/+types/login";

export const meta: MetaFunction = () => [
  { title: getPageTitle({ title: "Iniciar sesión" }) },
  { name: "description", content: "Login page for MoodTrack" },
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
    const login = new LoginAction(supabase);
    await login.execute(credentials);
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.message };
    }

    throw error;
  }

  return redirect("/", { headers });
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
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    const action = searchParams.get("action");

    if (!action) {
      console.log("no action");
      return;
    }

    const messages = {
      [LoginActionType.CONFIRM]: {
        title: "Confirmación exitosa",
        description:
          "Correo electrónico confirmado, ahora puedes iniciar sesión",
      },
      [LoginActionType.REMEMBER]: {
        title: "Confirmación de usuario",
        description:
          "Antes de iniciar sesión debes confirmar el link que te enviamos",
      },
    };

    const message = messages[action];

    if (message) {
      toast.info(message.title, {
        description: message.description,
        closeButton: true,
        duration: Infinity,
      });
    }
  }, [searchParams]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="min-w-lg">
        <CardHeader>
          <CardTitle>Inicia sesión en MoodTrack</CardTitle>
          <CardDescription>
            Bienvenidos a esta nueva experiencia
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form method="POST" className="flex flex-col items-center gap-2">
            {actionData && actionData.error ? (
              <p className="text-rose-500">{actionData.error}</p>
            ) : null}

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

            <div className="w-full max-w-sm flex flex-col gap-2 mt-4">
              <Button type="submit" className="w-full">
                {navigation.formAction === "/login" ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
              <Button
                variant="secondary"
                type="button"
                asChild
                className="w-full"
              >
                <Link to="/register">Crear Cuenta</Link>
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
