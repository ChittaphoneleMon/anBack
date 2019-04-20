import { Component, OnInit } from "@angular/core";
import { ShareServiceService } from "src/app/shared/share-service.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(public userService: ShareServiceService) {}

  ngOnInit() {}

  onExit() {
    this.userService.deleteToken();
  }
}
