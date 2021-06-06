import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Admin, AdminFormValues } from "../models/user";

export default class AdminStore {
  user: Admin | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }
  login = async (creds: AdminFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      console.log(user);
    } catch (error) {
      throw error;
    }
  };
}
