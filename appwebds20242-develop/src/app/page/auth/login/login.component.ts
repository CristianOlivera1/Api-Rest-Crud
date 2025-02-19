import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponentFk {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login(): void {
    fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        // Guardar el token en el localStorage
        localStorage.setItem('token', data.token);
        // Redirigir a la página principal
        this.router.navigate(['auth/getall']);
      } else {
        this.errorMessage = 'Nombre de usuario o contraseña incorrectos';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      this.errorMessage = 'Ocurrió un error al iniciar sesión';
    });
  }
}
