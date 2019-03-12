import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  catname: string = "Breakfast"
  selectedFile: File = null;
  txtShowStatus: string;
  dataProduct: [] = []
  mEdit: any = []
  constructor(public http: HttpClient, private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.getdataProduct()
  }

  getdataProduct() {
    this.ngxService.start();
    this.http.get(environment.apiBaseUrl + '/products').subscribe((res: any) => {
      this.ngxService.stop();
      this.dataProduct = res.data
    })
  }

  onSubmit(formValue: NgForm) {
    const fd = new FormData();
    fd.append("image", this.selectedFile);

    this.ngxService.start();
    this.http.post(environment.apiBaseUrl + '/products/upLoadfile', fd).subscribe((res: any) => {
      this.ngxService.stop();
      //console.log(Math.round(event.loaded / event.total * 100) + '%');angular tracking http
      if (res.rescode == 200) {
        this.http.post(environment.apiBaseUrl + '/products/save', formValue.value).subscribe((res: any) => {
          if (res.message == "success") {
            this.txtShowStatus = res.message;
            setTimeout(() => {
              this.txtShowStatus = "";
            }, 3000);
            this.getdataProduct()
            this.resetForm(formValue)
          } else {
            this.txtShowStatus = res.errmsg;
            setTimeout(() => {
              this.txtShowStatus = "";
            }, 3000);
          }
        });
      } else {
        this.ngxService.stop();
        this.txtShowStatus = res.messageUpload;
      }
    },
      (err => {
        this.ngxService.stop();
        this.txtShowStatus = err.message
      }));
  }

  onUpload(event) {
    this.selectedFile = <File>event.srcElement.files[0]
    //console.log(this.selectedFile)
  }

  onEditData(data) {
    this.mEdit = {
      id: data._id,
      proNameEdit: data.proName,
      categoryEdit: data.category,
      priceEdit: data.price
    }
    //console.log(data)
  }

  onSubmitEdit(formValueEdit: NgForm) {
    if (this.selectedFile) {
      const fd = new FormData();
      fd.append("image", this.selectedFile);

      var dataAllmEdit = {
        id: this.mEdit.id,
        proNameEdit: this.mEdit.proNameEdit,
        categoryEdit: this.mEdit.categoryEdit,
        priceEdit: this.mEdit.priceEdit,
        image: this.selectedFile.name
      }

      this.ngxService.start();
      this.http.post(environment.apiBaseUrl + '/products/upLoadfile', fd).subscribe((res: any) => {
        this.ngxService.stop();
        //console.log(Math.round(event.loaded / event.total * 100) + '%');angular tracking http
        if (res.rescode == 200) {

          this.http.post(environment.apiBaseUrl + '/products/edit', dataAllmEdit).subscribe((res: any) => {
            if (res.rescode == 200) {
              this.txtShowStatus = res.messageDetailEdit;
              setTimeout(() => {
                this.txtShowStatus = "";
              }, 3000);
              this.getdataProduct()
            } else {
              this.txtShowStatus = res.messageDetailEdit;
              setTimeout(() => {
                this.txtShowStatus = "";
              }, 3000);
            }
          });
        } else {
          this.ngxService.stop();
          this.txtShowStatus = res.messageDetailEdit;
        }
      });
    }
    else {
      this.ngxService.start();
      this.http.post(environment.apiBaseUrl + '/products/edit', this.mEdit).subscribe((res: any) => {
        this.ngxService.stop();
        if (res.rescode == 200) {
          this.txtShowStatus = res.messageDetailEdit;
          setTimeout(() => {
            this.txtShowStatus = "";
          }, 3000);
          this.getdataProduct()
        } else {
          this.txtShowStatus = res.messageDetailEdit;
          setTimeout(() => {
            this.txtShowStatus = "";
          }, 3000);
        }
      });
    }
  }

  onDeleteData(dataId) {
    if (confirm("Do You Want to delete?" + " " + dataId)) {
      this.ngxService.start();
      this.http.get(environment.apiBaseUrl + '/products/delete/' + dataId).subscribe((res: any) => {
        this.ngxService.stop();
        if (res.statusCode == 200) {
          this.getdataProduct()
        }
      });
    }
  }

  resetForm(formValue) {
    formValue.resetForm();
    this.catname = "Breakfast"
  }
}
