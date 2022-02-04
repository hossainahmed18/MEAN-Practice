
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Customer } from '../Interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
    })
  };
  constructor(private http: HttpClient) {
     
  }
  getCustomers(){
    return this.http.get<Customer[]>(environment.apiEndPoint+'/customer',this.httpOptions);
  }
  deleteCustomers(deleteEmail:string){
    return this.http.delete(environment.apiEndPoint+`/customer?email=${deleteEmail}`,this.httpOptions);
  }
  saveCustomer(customer:Customer){
    return this.http.post<Customer>(environment.apiEndPoint+'/customer',customer,this.httpOptions);
  }
  updateCustomer(customer:Customer){
    return this.http.put<Customer>(environment.apiEndPoint+'/customer/',customer,this.httpOptions);
  }
}
