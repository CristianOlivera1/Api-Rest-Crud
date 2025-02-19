import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlatziService } from '../../../api/platzi.service';

@Component({
  selector: 'app-platzi-getall',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './platzi-getall.component.html',
  styleUrl: './platzi-getall.component.css'
})
export class PlatziGetallComponent {
platzi: any[] = []; 
    
    constructor(
            private platziService: PlatziService
    ) {}

    ngOnInit() {
            this.platziService.getData().subscribe({
                    next: (response: any) => {
                            this.platzi = response.slice(0, 100);
                    },
                    error: (error: any) => {
                            console.log(error);
                    }
            });
    }

    onDelete(id: number) {
            this.platziService.deleteData(id).subscribe({
                    next: (response) => {
                            console.log('Producto eliminado:', response);
                            this.platzi = this.platzi.filter(product => product.id !== id);
                    },
                    error: (error) => {
                            console.error('Error al eliminar producto:', error);
                    }
            });
    }
}
