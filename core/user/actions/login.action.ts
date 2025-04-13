import { AuthAction, type Credentials } from "~/core/user/actions/auth.action";

export class LoginAction extends AuthAction {
  async execute({ email, password }: Credentials) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  }
}
