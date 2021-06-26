import { makeAutoObservable, runInAction } from "mobx";
import { history } from '../../index';
import agent from "../api/agent";
import { Admin, AdminFormValues } from "../models/user";
import { store } from "./store";

export default class AdminStore {
  user: Admin | null = null;
  //adminMode:boolean=false;

  token: string | null = window.localStorage.getItem('jwt');

  constructor() {
    makeAutoObservable(this);
  }
 
  get isLoggedIn() {
    return !!this.user;
  }
  login = async (creds: AdminFormValues) => {
    try {
      const user = await agent.Account.login(creds);
     store.commonStore.setToken(user.token);
      runInAction(() => this.user = user);
      history.push('/adminPage/paneli')
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };
  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem('jwt');
    this.user = null;
    history.push('/');
  }
  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => this.user = user);
    } catch (error) {
      console.log(error);
    }
  }
  //const [adminMode, setAdminMode] = useState(false);
  //  handleSetAdminMode=()=> {
  //  this.adminMode=true
  // }
}
