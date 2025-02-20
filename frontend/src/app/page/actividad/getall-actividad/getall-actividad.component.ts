import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../api/category.service';
import { NotifyComponent } from '../../../component/notify/notify.component';
import { ActividadService } from '../../../api/actividad.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-getall-actividad',
  standalone: true,
  imports: [CommonModule,RouterModule,NotifyComponent,FormsModule],
  templateUrl: './getall-actividad.component.html',
  styleUrl: './getall-actividad.component.css'
})
export class GetallActividadComponent implements OnInit {
  listActividad: any[] = [];
  filteredListActividad: any[] = [];
  estadoFilter: string = '';
  typeResponse: string = '';
  listMessageResponse: string[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 10;

  constructor(private actividadService: ActividadService) {}

  ngOnInit() {
    this.loadActividades(this.currentPage);
  }

  loadActividades(page: number): void {
    this.actividadService.getAll(page, this.pageSize).subscribe({
      next: (response: any) => {
        if (response && response.dto && response.dto.listActividad) {
          this.listActividad = response.dto.listActividad;
          this.totalPages = response.totalPages;
          this.filteredListActividad = this.listActividad;
          // console.log(this.listActividad);
        } else {
          console.error('Respuesta de la API no válida:', response);
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  filterByEstado(): void {
    if (this.estadoFilter === '') {
      this.filteredListActividad = this.listActividad;
    } else {
      const estado = this.estadoFilter === 'true';
      this.filteredListActividad = this.listActividad.filter(item => item.estado === estado);
    }
  }

  delete(idActividad: string): void {
    this.actividadService.delete(idActividad).subscribe({
      next: (response: any) => {
        this.typeResponse = response.mo.type;
        this.listMessageResponse = response.mo.listMessage;
        switch(response.mo.type) {
          case 'success':
            this.listActividad = this.listActividad.filter(x => x.idActividad != idActividad);
            this.filterByEstado();
            break;
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadActividades(this.currentPage);
    }
  }
}
