import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../api/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyComponent } from '../../../component/notify/notify.component';
import { CategoryService } from '../../../api/category.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,NotifyComponent],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  updateForm: FormGroup;
  productId: string = '';
  categories: any[] = [];

  typeResponse: string = '';
  listMessageResponse: string[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      idCategory: ['', Validators.required],
      name: ['', Validators.required],
      barcode: ['', Validators.required],
      sale_price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      state: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Obtener el ID del producto desde la URL
    this.productId = this.route.snapshot.paramMap.get('id') ?? '';
    
    if (!this.productId) {
      console.error('ID de producto inválido');
      return;
    }

    // Cargar las categorías y luego cargar los datos del producto
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (response: any) => {
        this.categories = response.dto.listCategory;
        // Llamar a la API para obtener los datos del producto después de cargar las categorías
        this.loadProductData();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  private loadProductData(): void {
    // Llamar a la API para obtener los datos del producto
    this.productService.getProductById(this.productId).subscribe({
      next: (response: any) => {
        if (response && response.dtoProduct) {
          this.updateForm.patchValue({
            idCategory: response.dtoProduct.idCategory,
            name: response.dtoProduct.name,
            barcode: response.dtoProduct.barcode,
            sale_price: response.dtoProduct.sale_price,
            stock: response.dtoProduct.stock,
            state: response.dtoProduct.state ? 'true' : 'false'
          });
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onUpdate() {
    if (this.updateForm.valid) {
      const formData = new FormData();
      formData.append('idCategory', this.updateForm.value.idCategory);
      formData.append('name', this.updateForm.value.name);
      formData.append('barcode', this.updateForm.value.barcode);
      formData.append('sale_price', this.updateForm.value.sale_price);
      formData.append('stock', this.updateForm.value.stock);
      formData.append('state', this.updateForm.value.state);

      this.productService.update(this.productId, formData).subscribe({
        next: (response) => {
          this.typeResponse = response.mo.type;
          this.listMessageResponse = response.mo.listMessage;
          if (response.mo.type === 'success') {
            //this.router.navigate(['/product/getall']);
          }
        },
        error: (error) => {
          console.error('Error al actualizar producto:', error);
        }
      });
    }
  }
}
