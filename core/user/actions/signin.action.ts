import {
  adjectives,
  nouns,
  uniqueUsernameGenerator,
} from "unique-username-generator";

import { LoginActionType } from "~/client/shared/auth/login-action-types";
import { AuthAction, type Credentials } from "~/core/user/actions/auth.action";

export class SignInAction extends AuthAction {
  async execute({ email, password }: Credentials) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/login?action=${LoginActionType.CONFIRM}`,
        data: {
          username: uniqueUsernameGenerator({
            dictionaries: [adjectives, nouns],
            style: "capital",
            separator: "",
          }),
        },
      },
    });
    if (error) {
      throw error;
    }
    return data;
  }
}
