import { Component, OnInit, inject, signal } from '@angular/core';
import { Client } from '../../model/interface/class/client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';
import { AsyncPipe, CommonModule, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AlertComponent } from '../../resuseableComponent/alert/alert.component';
import { MyButtonComponent } from '../../resuseableComponent/my-button/my-button.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule,CommonModule,UpperCasePipe,DatePipe,JsonPipe,AsyncPipe,AlertComponent,MyButtonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  clientObj: Client = new Client();

  currentDate:Date = new Date();

  clientList: Client[] = [];


  clientService = inject(ClientService);

  userList$:Observable<any>= new Observable<any>();

  ngOnInit(): void {
    this.loadClient(); 
    this.userList$ = this.clientService.getAllUser(); 
  }
  loadClient() {
    this.clientService.getAllClients().subscribe((result: APIResponseModel) => {
      this.clientList = result.data;
    })
  }
  onSaveClient() {
    debugger;
    this.clientService.addUpdate(this.clientObj).subscribe((result: APIResponseModel) => {
      if(result.result){
        alert("Client Added Successfully");
        this.loadClient(); 
        this.clientObj = new Client();
      }
      else{
        alert(result.message);
      }
    })
  }
  
  onEdit(data:Client){
    this.clientObj  = data;
  }
  onDelete(id:number){

    const isDelete = confirm("Are you sure to delete ?");
    if (isDelete) {
      this.clientService.deleteClientById(id).subscribe((result: APIResponseModel) => {
        if(result.result){
          alert("Client Delete Successfully");
          this.loadClient(); 
     
        }
        else{
          alert(result.message);
        }
      })
    }
   
  }
}
