import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../api/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotifyComponent } from '../../../component/notify/notify.component';

@Component({
  selector: 'app-getall-product',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterModule,NotifyComponent],
  templateUrl: './getall-product.component.html',
  styleUrl: './getall-product.component.css'
})
export class GetallProductComponent  implements OnInit{
  listProduct: any[] = [];
  categories: any[] = [];
  typeResponse: string = '';
  listMessageResponse: string[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (response: any) => {
        this.listProduct = response.dto.listProduct;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  delete(idProduct: string): void {
    this.productService.delete(idProduct).subscribe({
      next: (response: any) => {
        this.typeResponse = response.mo.type;
        this.listMessageResponse = response.mo.listMessage;
        switch (response.mo.type) {
          case 'success':
            this.listProduct = this.listProduct.filter(x => x.idProduct !== idProduct);
            break;
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
