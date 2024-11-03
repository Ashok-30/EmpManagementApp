import { Component, OnInit, inject, signal } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel, ClientProject, Employee } from '../../model/interface/role';
import { Client } from '../../model/interface/class/client';
import { DatePipe } from '@angular/common';
import { AlertComponent } from '../../resuseableComponent/alert/alert.component';
import { MyButtonComponent } from '../../resuseableComponent/my-button/my-button.component';

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule,DatePipe,AlertComponent,MyButtonComponent],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit {

  clientSrv=inject(ClientService);
  employeeList:Employee []=[]; 
  clientList:Client []=[];
  projectList=signal<ClientProject[]>([]);



  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl('',[Validators.required, Validators.minLength(5)]),
    startDate: new FormControl(''),
    expectedEndDate: new FormControl(''),
    leadByEmpId: new FormControl(''),
    completedDate: new FormControl(''),
    contactPerson: new FormControl(''),
    
    contactPersonContactNo: new FormControl(''),
    totalEmpWorking: new FormControl(''),
    projectCost: new FormControl(''),
    projectDetails: new FormControl(''),
    contactPersonEmailId: new FormControl(''),
    clientId: new FormControl('')
  })
 
  ngOnInit(): void {
      this.getAllEmployee();
      this.getAllClient();
      this.getAllClientProject();
  }

  getAllEmployee(){
    this.clientSrv.getAllEmployee().subscribe((result:APIResponseModel)=>{
      this.employeeList=result.data
    })
  }
  getAllClientProject(){
    this.clientSrv.getAllClientProject().subscribe((result:APIResponseModel)=>{
      this.projectList.set(result.data);
    })
  }
  getAllClient(){
    this.clientSrv.getAllClients().subscribe((result:APIResponseModel)=>{
      this.clientList=result.data
    })
  }
  onSaveProject(){
    const formValue = this.projectForm.value;

    this.clientSrv.addClientProjectUpdate(formValue).subscribe((result:APIResponseModel)=>{
      if(result.result){
        alert("Project Added Successfully");
     
      }
      else{
        alert(result.message);
      }
    })
  }
}
