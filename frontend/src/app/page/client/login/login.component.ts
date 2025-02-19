import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../../api/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifyComponent } from '../../../component/notify/notify.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NotifyComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  dni: string = '';
  errorMessage: string = '';

  typeResponse: string = '';
  listMessageResponse: string[] = [];

  constructor(private authService: ClientService, private router: Router) { }

  login() {
    if (!this.email || !this.dni) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    this.authService.login(this.email, this.dni).subscribe({
      next: response => {
        this.typeResponse = response.mo.type;
        this.listMessageResponse = response.mo.listMessage;
        if (response.mo.type === 'success') {
          // guardar la inf del cliente en el localstorage
          localStorage.setItem('user', JSON.stringify(response.dtoClient));
          this.router.navigate(['/client/getall']); 
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
