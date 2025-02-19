import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotifyComponent } from '../../../component/notify/notify.component';
import { UserService } from '../../../api/user.service';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NotifyComponent],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {
  updateForm: FormGroup;
  userId: string = '';

  typeResponse: string = '';
  listMessageResponse: string[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      nameUser: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    // Obtener el ID del usuario desde la URL
    this.userId = this.route.snapshot.paramMap.get('id') ?? '';
    
    if (!this.userId) {
      console.error('ID de usuario inválido');
      return;
    }

    // Llamar a la API para obtener los datos del usuario
    this.userService.getUserById(this.userId).subscribe({
      next: (response: any) => {
        if (response && response.dtoUser) {
          this.updateForm.patchValue({
            nameUser: response.dtoUser.nameUser,
            password: response.dtoUser.password,
            confirmPassword: response.dtoUser.password
          });
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.controls['password'].value === form.controls['confirmPassword'].value
      ? null : { mismatch: true };
  }

  onUpdate() {
    if (this.updateForm.valid) {
      const formData = new FormData();
      formData.append('nameUser', this.updateForm.value.nameUser);
      formData.append('password', this.updateForm.value.password);

      this.userService.update(this.userId, formData).subscribe({
        next: (response) => {
          this.typeResponse = response.mo.type;
          this.listMessageResponse = response.mo.listMessage;
          if (response.mo.type === 'success') {
            this.router.navigate(['/user/getall']);
          }
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
        }
      });
    }
  }
}
