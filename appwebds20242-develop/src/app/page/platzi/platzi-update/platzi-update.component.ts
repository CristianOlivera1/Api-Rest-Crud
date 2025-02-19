import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatziService } from '../../../api/platzi.service';

@Component({
  selector: 'app-platzi-update',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './platzi-update.component.html',
  styleUrl: './platzi-update.component.css'
})
export class PlatziUpdateComponent {
  updateForm: FormGroup;
  productId: number = 0; // Inicializa con un valor predeterminado

  constructor(
    private fb: FormBuilder,
    private platziService: PlatziService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      images: ['', [Validators.required, this.urlValidator]]
    });
  }

  ngOnInit() {
        // Obtener el ID del producto desde la URL

    this.productId = +(this.route.snapshot.paramMap.get('id') ?? 0);
        // Llamar a la API para obtener los datos del producto

    this.platziService.getData().subscribe({
      next: (response: any) => {
        const product = response.find((p: any) => p.id === this.productId);
        if (product) {
                    // Actualizar el formulario con los datos del producto
          this.updateForm.patchValue({
            ...product,
            categoryId: product.category.id, // Asigna el ID de la categoría al campo categoryId
            images: product.images[0] // Asume que solo hay una URL en el array
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
      const product = {
        ...this.updateForm.value,
        images: [this.updateForm.value.images] // Convierte la URL a un array con un solo elemento
      };

      this.platziService.updateData(this.productId, product).subscribe({
        next: (response) => {
          console.log('Producto actualizado:', response);
          this.router.navigate(['platzi/getall']);
        },
        error: (error) => {
          console.error('Error al actualizar producto:', error);
        }
      });
    }
  }

  private urlValidator(control: FormControl): { [key: string]: boolean } | null {
    try {
      new URL(control.value);
      return null;
    } catch (_) {
      return { invalidUrl: true };
    }
  }
}
