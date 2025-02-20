import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { NotifyComponent } from '../../../component/notify/notify.component';
import { ClientService } from '../../../api/client.service';
import { CustomValidators } from '../../../validators/custom-validators';

@Component({
  selector: 'app-insert',
  standalone: true,
  imports: [  CommonModule,FormsModule,ReactiveFormsModule,NotifyComponent],
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.css'
})
export class InsertComponent {
  frmClientInsert: UntypedFormGroup;

  get firstNameFb() { return this.frmClientInsert.controls['firstName']; }
  get surNameFb() { return this.frmClientInsert.controls['surName']; }
  get dniFb() { return this.frmClientInsert.controls['dni']; }
  get genderFb() { return this.frmClientInsert.controls['gender']; }
  get phoneFb() { return this.frmClientInsert.controls['phone']; }
  get addressFb() { return this.frmClientInsert.controls['address']; }
  get birthDateFb() { return this.frmClientInsert.controls['birthDate']; }
  get emailFb() { return this.frmClientInsert.controls['email']; }

  typeResponse: string = '';
  listMessageResponse: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
  ) {
    this.frmClientInsert = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      surName: ['', [Validators.required]],
      dni: ['', [Validators.required, CustomValidators.dniValidator()]],
      gender: ['true', [Validators.required]],
      phone: ['', [Validators.required, CustomValidators.phoneValidator()]],
      address: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required, CustomValidators.emailValidator()]]
    });
  }

  public save(): void {
    if (!this.frmClientInsert.valid) {
      this.frmClientInsert.markAllAsTouched();
      this.frmClientInsert.markAsDirty();

      return;
    }

    let formData = new FormData();

    formData.append('firstName', this.firstNameFb.value);
    formData.append('surName', this.surNameFb.value);
    formData.append('dni', this.dniFb.value);
    formData.append('gender', this.genderFb.value);
    formData.append('phone', this.phoneFb.value);
    formData.append('address', this.addressFb.value);
    formData.append('birthDate', this.birthDateFb.value);
    formData.append('email', this.emailFb.value);

    this.clientService.insert(formData).subscribe({
      next: (response: any) => {
        this.typeResponse = response.mo.type;
        this.listMessageResponse = response.mo.listMessage;
        switch(response.mo.type) {
          case 'success':
            this.frmClientInsert.reset();
            this.frmClientInsert.controls['gender'].setValue('true');
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