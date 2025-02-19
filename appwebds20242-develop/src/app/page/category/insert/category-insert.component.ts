import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CategoryService } from '../../../api/category.service';
import { NotifyComponent } from '../../../component/notify/notify.component';

@Component({
  selector: 'app-category-insert',
  standalone: true,
  imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,NotifyComponent
	],
  templateUrl: './category-insert.component.html',
  styleUrl: './category-insert.component.css'
})
export class CategoryInsertComponent {
  frmCategoryInsert: UntypedFormGroup;

  get nameFb() { return this.frmCategoryInsert.controls['name']; }
  get descriptionFb() { return this.frmCategoryInsert.controls['description']; }
  get stateFb() { return this.frmCategoryInsert.controls['state']; }
  
  typeResponse: string = '';
	listMessageResponse: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
  ) {
    this.frmCategoryInsert = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });
  }

  public save(): void {
    if (!this.frmCategoryInsert.valid) {
      this.frmCategoryInsert.markAllAsTouched();
      this.frmCategoryInsert.markAsDirty();

      return;
    }

    let formData = new FormData();

    formData.append('name', this.nameFb.value);
    formData.append('description', this.descriptionFb.value);
    formData.append('state', this.stateFb.value);

    this.categoryService.insert(formData).subscribe({
      next: (response: any) => {
        this.typeResponse = response.mo.type;
				this.listMessageResponse = response.mo.listMessage;
        switch(response.mo.type) {
					case 'success':
						this.frmCategoryInsert.reset();

						break;
				}
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
