import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ShareServiceService {
  constructor() {}

  setToken(userData: string) {
    return localStorage.setItem("userData", JSON.stringify(userData));
  }

  getToken() {
    return localStorage.getItem("userData");
  }

  deleteToken() {
    return localStorage.removeItem("userData");
  }

  isLogined() {
    var token = this.getToken();
    if (token) {
      return true;
    } else return null;
  }
}
