import { makeAutoObservable } from "mobx"
export interface IUserInfo {
    username: string,
    email: string,
    photoURL?: string
}
export class UserStore {
    constructor() {
        makeAutoObservable(this);
    }
    userInfo: IUserInfo = {
        email: '',
        photoURL: '',
        username: ''
    };
    loginStatus: boolean = false
    get getLoginStatus() {
        return this.loginStatus
    }

    updateUserInfo(state: IUserInfo) {
        this.userInfo = state;
    }
    updateLoginStatus(state: boolean) {
        //Api request send
        //....
        this.loginStatus = state
    }
}
export const userStore = new UserStore();


