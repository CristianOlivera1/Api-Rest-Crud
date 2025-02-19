import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { NotifyComponent } from '../../../component/notify/notify.component';
import { UserService } from '../../../api/user.service';

@Component({
  selector: 'app-user-insert',
  standalone: true,
  imports: [  CommonModule,FormsModule,ReactiveFormsModule,NotifyComponent],
  templateUrl: './user-insert.component.html',
  styleUrl: './user-insert.component.css'
})

export class UserInsertComponent {
   frmUserInsert: FormGroup;

  get nameUserFb() { return this.frmUserInsert.controls['nameUser']; }
  get passwordFb() { return this.frmUserInsert.controls['password']; }
  get confirmPasswordFb() { return this.frmUserInsert.controls['confirmPassword']; }

  typeResponse: string = '';
  listMessageResponse: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.frmUserInsert = this.formBuilder.group({
      nameUser: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value
      ? null : { 'mismatch': true };
  }

  public save(): void {
    if (!this.frmUserInsert.valid) {
      this.frmUserInsert.markAllAsTouched();
      this.frmUserInsert.markAsDirty();
      return;
    }

    let formData = new FormData();
    formData.append('nameUser', this.nameUserFb.value);
    formData.append('password', this.passwordFb.value);

    this.userService.insert(formData).subscribe({
      next: (response: any) => {
        this.typeResponse = response.mo.type;
        this.listMessageResponse = response.mo.listMessage;
        if (response.mo.type === 'success') {
          this.frmUserInsert.reset();
        }
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  }