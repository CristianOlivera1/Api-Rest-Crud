import { Component } from '@angular/core';
import { CategoryService } from '../../../api/category.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotifyComponent } from '../../../component/notify/notify.component';

@Component({
  selector: 'app-category-get-all',
  standalone: true,
  imports: [
	CommonModule,RouterModule,NotifyComponent
  ],
  templateUrl: './category-get-all.component.html',
  styleUrl: './category-get-all.component.css'
})
export class CategoryGetAllComponent {
	listCategory: any[] = [];
	typeResponse: string = '';
	listMessageResponse: string[] = [];
	
	constructor(
		private categoryService: CategoryService
	) {}

	ngOnInit() {
		this.categoryService.getAll().subscribe({
			next: (response: any) => {
				this.listCategory = response.dto.listCategory;
				console.log(this.listCategory);
			},
			error: (error: any) => {
				console.log(error);
			}
		});
	}

	delete(idcategory: string): void {
		this.categoryService.delete(idcategory).subscribe({
			next: (response: any) => {
				this.typeResponse = response.mo.type;
				this.listMessageResponse = response.mo.listMessage;
				switch(response.mo.type) {
					case 'success':
						this.listCategory = this.listCategory.filter(x => x.idcategory != idcategory);
						break;
				}
			},
			error: (error: any) => {
				console.log(error);
			}
		});
	}

	
}