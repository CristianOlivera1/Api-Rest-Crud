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

  public existsLogin() {
	const sessionIdUser = localStorage.getItem('sessionIdUser');
	return !!(sessionIdUser && sessionIdUser !== 'undefined' && sessionIdUser !== 'null');
  }
  logout(): void {
	const sessionIdUser = localStorage.getItem('sessionIdUser');
  
	if (sessionIdUser) {
	  this.authService.logout(sessionIdUser).subscribe({
		next: () => {
		  console.log('Sesión cerrada correctamente.');
		},
		error: (error) => {
		  console.error('Error al cerrar sesión:', error);
		},
		complete: () => {
		  // 🔥 FORZAR ELIMINACIÓN DE TODOS LOS DATOS
		  localStorage.clear();
  
		  this.router.navigate(['/login'], { queryParams: { logout: new Date().getTime() } }).then(() => {
			window.location.reload();
		  });
		}
	  });
	} else {
	  // 🔥 Si no hay sesión, igual limpiamos el localStorage
	  localStorage.clear();
	  this.router.navigate(['/login']).then(() => {
		window.location.reload();
	  });
	}
  }
  
  
}
