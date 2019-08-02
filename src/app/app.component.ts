import { Component, OnInit } from '@angular/core';
import { ProductService } from './shared/product.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private service: ProductService, private toastr: ToastrService) {

  }
  title = 'RestDemoApp';
  FileName: string = "Seleccionar imagen";
  FileToUpload: File = null;
  ImageURL: string = "assets/img/noimage.jpg";

  UpdateControls(e): void {
    this.FileToUpload = e.target.files.item(0);
    this.FileName = this.FileToUpload.name;

    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.ImageURL = event.target.result;
    }
    reader.readAsDataURL(this.FileToUpload);
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

    this.service.formData = {
      Idproduct: 0,
      Productname: '',
      Price: 0,
      Description: '',
      Imagen: ''
    };
  }

  onSubmit(form: NgForm) {
    this.service.postProduct(form.value, this.FileToUpload).subscribe(
      res => {
        this.resetForm(form);
        this.ngOnInit();
        this.toastr.success("Producto agregado", "RESTDEMOAPP");
      },
      err => {
        this.resetForm(form);
        this.toastr.error(err.error, "RESTDEMOAPP");
      }
    )
  }

  ngOnInit() {
    this.service.getProducts();
  }

  onDelete(id: number) {
    if (confirm("esta seguro de querer borrar el producto?")){
      this.service.deleteProduct(id).subscribe(
        res => {
          this.ngOnInit();
          this.toastr.warning("producto eliminado", "RESTDEMOAPP")
        },
        err => {
          this.toastr.error(err.error, "RESTDEMOAPP")
        }
      )
    }
  }

}
