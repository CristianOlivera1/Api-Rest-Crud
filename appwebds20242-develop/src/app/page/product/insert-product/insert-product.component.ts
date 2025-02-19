import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../api/product.service';
import { CommonModule } from '@angular/common';
import { NotifyComponent } from '../../../component/notify/notify.component';
import { CategoryService } from '../../../api/category.service';

@Component({
  selector: 'app-insert-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NotifyComponent],
  templateUrl: './insert-product.component.html',
  styleUrls: ['./insert-product.component.css']
})
export class InsertProductComponent implements OnInit {
  frmProductInsert: UntypedFormGroup;
  categories: any[] = [];

  get idCategoryFb() { return this.frmProductInsert.controls['idCategory']; }
  get nameFb() { return this.frmProductInsert.controls['name']; }
  get barcodeFb() { return this.frmProductInsert.controls['barcode']; }
  get salePriceFb() { return this.frmProductInsert.controls['sale_price']; }
  get stockFb() { return this.frmProductInsert.controls['stock']; }
  get stateFb() { return this.frmProductInsert.controls['state']; }

  typeResponse: string = '';
  listMessageResponse: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.frmProductInsert = this.formBuilder.group({
      idCategory: ['', [Validators.required]],
      name: ['', [Validators.required]],
      barcode: ['', [Validators.required]],
      sale_price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      state: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (response: any) => {
        this.categories = response.dto.listCategory;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  public save(): void {
    if (!this.frmProductInsert.valid) {
      this.frmProductInsert.markAllAsTouched();
      this.frmProductInsert.markAsDirty();
      return;
    }

    let formData = new FormData();
    formData.append('idCategory', this.idCategoryFb.value);
    formData.append('name', this.nameFb.value);
    formData.append('barcode', this.barcodeFb.value);
    formData.append('sale_price', this.salePriceFb.value);
    formData.append('stock', this.stockFb.value);
    formData.append('state', this.stateFb.value);

    this.productService.insert(formData).subscribe({
      next: (response: any) => {
        this.typeResponse = response.mo.type;
        this.listMessageResponse = response.mo.listMessage;
        if (response.mo.type === 'success') {
          this.frmProductInsert.reset();
        }
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}