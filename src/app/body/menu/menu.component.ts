import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  selectedFile: File = null;
  imageQr: ''
  constructor(
    public http: HttpClient,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit() {
    const scriptmenu = document.createElement("script");
    scriptmenu.src = "assets/js/menu.js";
    document.body.appendChild(scriptmenu);

    this.getQr()
  }

  async  getQr() {
    await this.http
      .get(environment.apiBaseUrl + "/qr")
      .subscribe((res: any) => {
        if (res.status == "success") {
          this.imageQr = res['qr']
        }
      });
  }

  onUpload(event) {
    this.selectedFile = <File>event.srcElement.files[0];
  }

  onSave() {
    if (this.selectedFile === null) {
      return
    }

    const fd = new FormData();
    fd.append("image", this.selectedFile);

    this.ngxService.start();
    this.http
      .post(environment.apiBaseUrl + "/products/upLoadfile", fd)
      .subscribe(
        (res: any) => {
          this.ngxService.stop();
          if (res.rescode == 200) {
            location.reload()
          } else {
            this.ngxService.stop();
          }
        },
        err => {
          this.ngxService.stop();
        }
      );
  }

}
