import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlatziService } from '../../../api/platzi.service';

@Component({
  selector: 'app-platzi-insert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './platzi-insert.component.html',
  styleUrl: './platzi-insert.component.css'
})
export class PlatziInsertComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private platziService: PlatziService) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      images: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = {
        title: this.productForm.value.title,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
        categoryId: this.productForm.value.categoryId,
        images: [this.productForm.value.images]
      };

      this.platziService.postData(product).subscribe({
        next: (response) => {
          console.log('Producto insertado:', response);
        },
        error: (error) => {
          console.error('Error al insertar producto:', error);
        }
      });
    }
  }
}
