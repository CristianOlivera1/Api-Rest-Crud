import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotifyComponent } from '../../../component/notify/notify.component';
import { ActividadService } from '../../../api/actividad.service';

@Component({
  selector: 'app-update-actividad',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,NotifyComponent],
  templateUrl: './update-actividad.component.html',
  styleUrl: './update-actividad.component.css'
})
export class UpdateActividadComponent {
 updateForm: FormGroup;
  actividadId: string = '';

  typeResponse: string = '';
  listMessageResponse: string[] = [];
  constructor(
    private fb: FormBuilder,
    private actividadService: ActividadService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      actividad: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Obtener el ID de la categoría desde la URL
    this.actividadId = this.route.snapshot.paramMap.get('id') ?? '';
    
    if (!this.actividadId) {
      console.error('ID de actividad inválido');
      return;
    }

    // Llamar a la API para obtener los datos de la categoría
    this.actividadService.getActividadById(this.actividadId).subscribe({
      next: (response: any) => {
        if (response && response.dtoActividad) {
                const fechaInicio = new Date(response.dtoActividad.fechaInicio);
                fechaInicio.setMinutes(fechaInicio.getMinutes() - fechaInicio.getTimezoneOffset());
                const fechaFin = new Date(response.dtoActividad.fechaFin);
                fechaFin.setMinutes(fechaFin.getMinutes() - fechaFin.getTimezoneOffset());

                this.updateForm.patchValue({
                actividad: response.dtoActividad.actividad,
                fechaInicio: fechaInicio.toISOString().slice(0, 16),
                fechaFin: fechaFin.toISOString().slice(0, 16),
                estado: response.dtoActividad.estado ? '1' : '0'
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
      formData.append('actividad', this.updateForm.value.actividad);
      formData.append('fechaInicio', this.updateForm.value.fechaInicio);
      formData.append('fechaFin', this.updateForm.value.fechaFin);

      this.actividadService.update(this.actividadId, formData).subscribe({
        next: (response) => {
          //console.log('Categoría actualizada:', response);
          this.typeResponse = response.mo.type;
          this.listMessageResponse = response.mo.listMessage;
            this.router.navigate(['/actividad/update/', this.actividadId]);
        },
        error: (error) => {
          console.error('Error al actualizar actividad:', error);
        }
      });
    }
  }
}
