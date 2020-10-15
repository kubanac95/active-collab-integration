import * as axios from "axios";

interface User {
  first_name: string;
  last_name: string;
  intent: string;
  avatar_url: string;
}

interface IAccount {
  url: string;
  name: number;
  display_name: string;
  class: string;
}

type LoginResponse = {
  is_ok: boolean;
  accounts: Array<IAccount>;
  user: User;
};

type IssueTokenResponse = {
  is_ok: boolean;
  token: string;
};

class Account {
  api: axios.AxiosInstance;

  private token?: string;
  private user_id?: number;

  private intent: string;
  private account: IAccount;

  constructor(user: User, account: IAccount) {
    this.intent = user.intent;
    this.account = account;

    this.api = axios.default.create({
      baseURL: `${account.url}/api/v1`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  issueToken() {
    return this.api
      .post(
        "/issue-token",
        JSON.stringify({
          client_name: this.account.name,
          client_vendor: this.account.display_name,
          intent: this.intent,
        })
      )
      .then((response) => {
        const data = response.data as IssueTokenResponse;

        if (!data.is_ok) {
          throw new Error("Unauthorized");
        }

        if (!data.token) {
          throw new Error("Authorization token is missing");
        }

        this.token = data.token;

        this.user_id = parseInt(this.token.split("-")[0]);

        this.api.defaults.headers = {
          "X-Angie-AuthApiToken": this.token,
        };

        return this;
      });
  }

  user() {
    return this.api(`/users/${this.user_id}`).then(
      ({ data }: { data: TResponseDocument<TUser> }) => data.single
    );
  }

  projects() {
    return this.api("/projects").then(
      ({ data }: { data: TResponseCollection<TProject> }) => data
    );
  }
}

class Client {
  user?: User;
  accounts: Array<Account> = [];

  login(email: string, password: string) {
    return axios.default
      .request({
        method: "POST",
        url: "https://my.activecollab.com/api/v1/external/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          email,
          password,
        }),
      })
      .then((response) => {
        const data = response.data as LoginResponse;

        if (!data?.is_ok) {
          throw new Error("Unauthorized");
        }

        if (!(Array.isArray(data.accounts) && data.accounts.length > 0)) {
          throw new Error("No accounts");
        }

        this.user = data.user;
        this.accounts = data.accounts.map(
          (account) => new Account(data.user, account)
        );

        return this;
      });
  }
}

export default Client;
