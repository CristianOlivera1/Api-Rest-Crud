import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotifyComponent } from '../../../component/notify/notify.component';
import { UserService } from '../../../api/user.service';

@Component({
  selector: 'app-user-get-all',
  standalone: true,
  imports: [CommonModule,RouterModule,NotifyComponent],
  templateUrl: './user-get-all.component.html',
  styleUrl: './user-get-all.component.css'
})
export class UserGetAllComponent {

  listUser: any[] = [];
  typeResponse: string = '';
  listMessageResponse: string[] = [];
  
  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (response: any) => {
        this.listUser = response.dto.listUser;
        console.log("Inicio exitoso!");
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  delete(idUser: string): void {
    this.userService.delete(idUser).subscribe({
      next: (response: any) => {
        this.typeResponse = response.mo.type;
        this.listMessageResponse = response.mo.listMessage;
        switch(response.mo.type) {
          case 'success':
            this.listUser = this.listUser.filter(x => x.idUser != idUser);
            break;
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
