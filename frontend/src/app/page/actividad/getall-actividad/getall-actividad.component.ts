import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class GetallActividadComponent {
  listActividad: any[] = [];
  filteredListActividad: any[] = [];
  estadoFilter: string = '';
  typeResponse: string = '';
  listMessageResponse: string[] = [];
  
  constructor(
    private actividadService: ActividadService
  ) {}

  ngOnInit() {
    this.actividadService.getAll().subscribe({
      next: (response: any) => {
        this.listActividad = response.dto.listActividad;
        this.sortByFechaInicio();
        this.filteredListActividad = this.listActividad;
        console.log(this.listActividad);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  sortByFechaInicio(): void {
    this.listActividad.sort((a, b) => new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime());
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
            this.filterByEstado(); // Actualizar la lista filtrada después de eliminar
            break;
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
