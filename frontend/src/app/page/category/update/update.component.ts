import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../api/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifyComponent } from '../../../component/notify/notify.component';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,NotifyComponent],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  updateForm: FormGroup;
  categoryId: string = '';

  typeResponse: string = '';
	listMessageResponse: string[] = [];
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Obtener el ID de la categoría desde la URL
    this.categoryId = this.route.snapshot.paramMap.get('id') ?? '';
    
    if (!this.categoryId) {
      console.error('ID de categoría inválido');
      return;
    }

    // Llamar a la API para obtener los datos de la categoría
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (response: any) => {
        if (response && response.dto) {
          this.updateForm.patchValue({
            name: response.dto.name,
            description: response.dto.description,
            state: response.dto.state ? '1' : '0'
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
      formData.append('name', this.updateForm.value.name);
      formData.append('description', this.updateForm.value.description);
      formData.append('state', this.updateForm.value.state);

      this.categoryService.update(this.categoryId, formData).subscribe({
        next: (response) => {
          //console.log('Categoría actualizada:', response);
          this.typeResponse = response.mo.type;
          this.listMessageResponse = response.mo.listMessage;
            this.router.navigate(['/category/update/', this.categoryId]);
        },
        error: (error) => {
          console.error('Error al actualizar categoría:', error);
        }
      });
    }
  }
}