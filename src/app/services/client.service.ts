import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/interface/class/client';
import { environment } from '../../environments/environment.development';
import { APIResponseModel } from '../model/interface/role';
import { Constant } from '../components/constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  getAllClients():Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(environment.APIUrl+Constant.API_METHOS.GET_ALL_CLIENT)
  }

  getAllEmployee():Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(environment.APIUrl+Constant.API_METHOS.GET_ALL_EMP)
  }
  getAllClientProject():Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(environment.APIUrl+Constant.API_METHOS.GET_ALL_PROJECT)
  }
  addUpdate(obj:Client):Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>(environment.APIUrl+Constant.API_METHOS.ADD_CLIENT,obj)
  }
  deleteClientById(id:number):Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>(environment.APIUrl+"DeleteClientByClientId?clientId="+id)
  }
  addClientProjectUpdate(obj:Client):Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>(environment.APIUrl+Constant.API_METHOS.ADD_CLIENT_PROJECT,obj)
  }

  getAllUser(){
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }
}
