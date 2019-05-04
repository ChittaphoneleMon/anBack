import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: "app-order-user",
  templateUrl: "./order-user.component.html",
  styleUrls: ["./order-user.component.css"]
})
export class OrderUserComponent implements OnInit {
  dataMyorder: [] = [];

  constructor(
    public http: HttpClient,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit() {
    this.ngxService.start();
    this.http.get(environment.apiBaseUrl + "/orders/list").subscribe(res => {
      this.ngxService.stop();
      if (res["statuscode"] == 200) {
        this.dataMyorder = res["result"];
      }
    });
  }
}
