import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../Interfaces/customer';
import { ModalService } from '../modal/modal.service';
import{ ApiService } from '../services/api.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  loadingCustomers = 0;
  customers!:Customer[];
  customerDeleteWarning = "customerDeleteWarning";

  customerForm: FormGroup = this.formBuilder.group({
		name: ['',{ validators: [Validators.required] }],
    email: ['',{ validators: [Validators.required] }],
    phoneNumber: ['',{ validators: [Validators.required] }],
	});

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private modalService : ModalService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  submitCustomerForm(){

  }

  loadCustomers(){
    this.apiService.getCustomers().subscribe((customers:Customer[])=>{
      this.customers = customers;
   })
  }

  setForDelete(){
    this.modalService.open(this.customerDeleteWarning);
  }
  closeModal(){
    this.modalService.close(this.customerDeleteWarning);
  }

}
