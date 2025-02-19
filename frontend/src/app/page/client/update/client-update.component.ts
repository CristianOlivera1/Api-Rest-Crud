import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotifyComponent } from '../../../component/notify/notify.component';
import { ClientService } from '../../../api/client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,NotifyComponent],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class ClientUpdateComponent implements OnInit {
  updateForm: FormGroup;
  clientId: string = '';

  typeResponse: string = '';
  listMessageResponse: string[] = [];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      firstName: ['', Validators.required],
      surName: ['', Validators.required],
      dni: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    // Obtener el ID del cliente desde la URL
    this.clientId = this.route.snapshot.paramMap.get('id') ?? '';
    
    if (!this.clientId) {
      console.error('ID de cliente inválido');
      return;
    }

    // Llamar a la API para obtener los datos del cliente
    this.clientService.getClientById(this.clientId).subscribe({
      next: (response: any) => {
        if (response && response.dtoClient) {
          this.updateForm.patchValue({
            firstName: response.dtoClient.firstName,
            surName: response.dtoClient.surName,
            dni: response.dtoClient.dni,
            gender: response.dtoClient.gender ? 'true' : 'false',
            phone: response.dtoClient.phone,
            address: response.dtoClient.address,
            birthDate: new Date(response.dtoClient.birthDate).toISOString().split('T')[0],
            email: response.dtoClient.email
          });
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  //cargar losd atos de la pagina anteriror
  onUpdate() {
    if (this.updateForm.valid) {
      const formData = new FormData();
      formData.append('firstName', this.updateForm.value.firstName);
      formData.append('surName', this.updateForm.value.surName);
      formData.append('dni', this.updateForm.value.dni);
      formData.append('gender', this.updateForm.value.gender);
      formData.append('phone', this.updateForm.value.phone);
      formData.append('address', this.updateForm.value.address);
      formData.append('birthDate', this.updateForm.value.birthDate);
      formData.append('email', this.updateForm.value.email);

      this.clientService.update(this.clientId, formData).subscribe({
        next: (response) => {
          //console.log('Cliente actualizado:', response);
          this.typeResponse = response.mo.type;
          this.listMessageResponse = response.mo.listMessage;
         // this.router.navigate(['/client/getall']);
        },
        error: (error) => {
          console.error('Error al actualizar cliente:', error);
        }
      });
    }
  }
}
