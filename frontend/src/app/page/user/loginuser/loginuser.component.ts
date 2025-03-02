import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifyComponent } from '../../../component/notify/notify.component';
import { UserService } from '../../../api/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginuser',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NotifyComponent],
  templateUrl: './loginuser.component.html',
  styleUrl: './loginuser.component.css'
})
export class LoginuserComponent {
  nameUser: string = 'admin';
  password: string = '12345678';
  errorMessage: string = '';
  passwordFieldType: string = 'password';

  typeResponse: string = '';
  listMessageResponse: string[] = [];

  constructor(private authService: UserService, private router: Router) { }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  login() {
    if (!this.nameUser || !this.password) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    this.authService.login(this.nameUser, this.password).subscribe({
      next: response => {
        this.typeResponse = response.mo.type;
        this.listMessageResponse = response.mo.listMessage;
        if (response.mo.type === 'success') {
          // guardar la inf del usuario en el localstorage
          localStorage.setItem('sessionJwtToken', response.dtoUser.jwtToken);
          localStorage.setItem('sessionIdUser', response.dtoUser.idUser);
          localStorage.setItem('sessionNameUser', response.dtoUser.nameUser);

          this.router.navigate(['/user/getall']).then(() => {
            window.location.reload();
          });
        } else {
          this.errorMessage = response.mo.listMessage.join(', ');
        }
      },
      error: (error: any) => {
        console.log(error);
        this.errorMessage = 'Error al iniciar sesión';
      }
    });
  }
}
