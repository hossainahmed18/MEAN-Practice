import { Component, OnInit } from '@angular/core';
import { Customer } from '../Interfaces/customer';
import{ ApiService } from '../services/api.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  loadingCustomers = 0;
  customers!:Customer[]

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getCustomers().subscribe((customers:Customer[])=>{
       this.customers = customers;
    })
  }

}
