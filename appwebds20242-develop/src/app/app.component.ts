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
	userName:String="";
	constructor(private authService: UserService, private router: Router) {}

	ngOnInit() {
		this.userName = localStorage.getItem('sessionNameUser') || '';
	}
	public existsLogin() {
		const sessionIdUser = localStorage.getItem('sessionIdUser');
		return sessionIdUser !== undefined && sessionIdUser !== null && sessionIdUser !== 'undefined';
	  }

	  logout(): void {
		const sessionIdUser = localStorage.getItem('sessionIdUser');
		if (sessionIdUser) {
		  this.authService.logout(sessionIdUser).subscribe(() => {
			localStorage.removeItem('sessionJwtToken');
			localStorage.removeItem('sessionIdUser');
			localStorage.removeItem('sessionNameUser');
			this.router.navigate(['/login']);
		  });
		}
	  }
}
