import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotifyComponent } from '../../../component/notify/notify.component';
import { ClientService } from '../../../api/client.service';

@Component({
  selector: 'app-getall',
  standalone: true,
  imports: [CommonModule,RouterModule,NotifyComponent],
  templateUrl: './getall.component.html',
  styleUrl: './getall.component.css'
})
export class GetallComponent {

  listClient: any[] = [];
  typeResponse: string = '';
  listMessageResponse: string[] = [];
  
  constructor(
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.clientService.getAll().subscribe({
      next: (response: any) => {
        this.listClient = response.dto.listClient;
        console.log(this.listClient);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  delete(idClient: string): void {
    this.clientService.delete(idClient).subscribe({
      next: (response: any) => {
        this.typeResponse = response.mo.type;
        this.listMessageResponse = response.mo.listMessage;
        switch(response.mo.type) {
          case 'success':
            this.listClient = this.listClient.filter(x => x.idClient != idClient);
            break;
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  
}
