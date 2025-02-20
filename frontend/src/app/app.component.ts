import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from './api/user.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet,CommonModule],
	providers: [],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'appwebds20242';
  user: any = {};
  userName: String = "";

  constructor(private authService: UserService, private router: Router) {}

  ngOnInit() {
    this.userName = localStorage.getItem('sessionNameUser') || '';
  }
  public existsLogin(): boolean {
	const sessionIdUser = localStorage.getItem('sessionIdUser');
	return !!sessionIdUser;  // Retorna false si es null o undefined
  }
  
  logout(): void {
	const sessionIdUser = localStorage.getItem('sessionIdUser');
  
	if (sessionIdUser) {
	  this.authService.logout(sessionIdUser).subscribe({
		next: (response) => {
		  console.log('Sesión cerrada correctamente:', response);
		  localStorage.removeItem('sessionIdUser');
		  localStorage.removeItem('sessionNameUser');
		  this.router.navigate(['/user/login']).then(() => {
			window.location.reload();
		  });
		},
		error: (error) => {
		  console.error('Error al cerrar sesión:', error);
		}
	  });
	} else {
	  console.warn('No hay sesión activa.');
  
	  localStorage.clear();
	  this.router.navigate(['/user/login']).then(() => {
		window.location.reload();
	  });
	}
  }
  
}
