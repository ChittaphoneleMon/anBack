import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ShareServiceService } from "../shared/share-service.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  mLogin: modelLogin = new modelLogin();
  constructor(
    public http: HttpClient,
    public router: Router,
    private ngxService: NgxUiLoaderService,
    public userService: ShareServiceService
  ) {}
  showErrorMessage: string = "";

  ngOnInit() {
    if (this.userService.isLogined()) {
      this.router.navigate(["/product"]);
    }
  }

  onLoginSubmit(form: NgForm) {
    this.ngxService.start();
    this.http.post("http://localhost:3000/users/signin", form.value).subscribe(
      (res: any) => {
        this.ngxService.stop();
        if (res["resCode"] === 200) {
          this.userService.setToken(res["userData"]);
          this.router.navigate(["/product"]);
        } else {
          this.showErrorMessage = res["userData"];
          setTimeout(() => {
            this.showErrorMessage = "";
          }, 3000);
        }
      },
      (err: any) => {
        this.ngxService.stop();
        console.log(err);
      }
    );
  }
}

class modelLogin {
  email: string;
  password: string;
}
