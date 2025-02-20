import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotifyComponent } from '../../../component/notify/notify.component';
import { ActividadService } from '../../../api/actividad.service';

@Component({
  selector: 'app-insert-actividad',
  standalone: true,
  imports: [  CommonModule,
      FormsModule,
      ReactiveFormsModule,NotifyComponent],
  templateUrl: './insert-actividad.component.html',
  styleUrl: './insert-actividad.component.css'
})
export class InsertActividadComponent {
  frmActividadInsert: FormGroup;

  get actividadFb() { return this.frmActividadInsert.controls['actividad']; }
  get fechaInicioFb() { return this.frmActividadInsert.controls['fechaInicio']; }
  get fechaFinFb() { return this.frmActividadInsert.controls['fechaFin']; }
  get estadoFb() { return this.frmActividadInsert.controls['estado']; }

  typeResponse: string = '';
  listMessageResponse: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private actividadService: ActividadService,
  ) {
    this.frmActividadInsert = this.formBuilder.group({
      actividad: ['', [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      estado: ['true', [Validators.required]] 
    });
  }

  public save(): void {
    if (!this.frmActividadInsert.valid) {
      this.frmActividadInsert.markAllAsTouched();
      this.frmActividadInsert.markAsDirty();
      return;
    }

    let formData = new FormData();
    formData.append('actividad', this.actividadFb.value);
    formData.append('fechaInicio', this.fechaInicioFb.value);
    formData.append('fechaFin', this.fechaFinFb.value);
    formData.append('estado', this.estadoFb.value);

    this.actividadService.insert(formData).subscribe({
      next: (response: any) => {
        this.typeResponse = response.mo.type;
        this.listMessageResponse = response.mo.listMessage;
        if (response.mo.type === 'success') {
          this.frmActividadInsert.reset();
          this.frmActividadInsert.patchValue({ estado: 'true' }); 
        }
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
