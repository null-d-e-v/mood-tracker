import { AuthAction } from "~/core/user/actions/auth.action";

export class LogoutAction extends AuthAction {
  async execute() {
    const { error } = await this.supabase.auth.signOut({ scope: "local" });

    if (error) {
      throw error;
    }
  }
}
