import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../Interfaces/customer';
import { ModalService } from '../modal/modal.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  apiCalling = 0;
  customers!: Customer[];

  staticCustomers: Customer[] = [
    { name: "Junayed", email: "junayedrensa@gmail.com", phoneNumber: "0123",imageBase64String: "" },
    { name: "abc-abc", email: "abc-abc@gmail.com", phoneNumber: "4567",  imageBase64String: "" },
    { name: "bcd-bcd", email: "bcd-bcd@gmail.com", phoneNumber: "891011", imageBase64String: "" }
  ];
  customerDeleteWarning = "customerDeleteWarning";
  deleteEmail!: string;
  formSubmitted = false;
  saveMode: number = 0;
  isStatic = false;

  customerForm: FormGroup = this.formBuilder.group({
    name: ['', { validators: [Validators.required] }],
    email: ['', { validators: [Validators.required] }],
    phoneNumber: ['', { validators: [Validators.required] }],
    imageBase64String: ['',],
  });

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private modalService: ModalService) { }

  ngOnInit(): void {
    if (!this.isStatic) {
      this.loadCustomers();
    } else {
      this.customers = this.staticCustomers;
    }
  }

  onChangeFile = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      this.customerForm.get("imageBase64String")?.setValue(filereader.result);
    };
  };

  submitCustomerForm() {
    this.formSubmitted = true;
    if (!this.customerForm.valid) {
      return;
    }
    let customerData: Customer = {
      email: this.customerForm.controls.email.value,
      name: this.customerForm.controls.name.value,
      phoneNumber: this.customerForm.controls.phoneNumber.value,
      imageBase64String: this.customerForm.controls.imageBase64String.value
    };
    this.apiCalling = 1;
    if (this.saveMode == 1) {
      this.apiService.saveCustomer(customerData).subscribe((data: Customer) => {
        this.customers.splice(0, 0, data);
        this.apiCalling = 2;
        this.resetForm();
        this.saveMode = 0;
        this.formSubmitted = false;
      })
    } else if (this.saveMode == 2) {
      this.apiService.updateCustomer(customerData).subscribe((data: Customer) => {
        this.customers = this.customers.filter(c => c.email != customerData.email);
        this.customers.splice(0, 0, data);
        this.apiCalling = 2;
        this.resetForm();
        this.saveMode = 0;
        this.formSubmitted = false;
      })
    }

  }

  loadCustomers() {
    this.apiCalling = 1;
    this.apiService.getCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers;
      this.apiCalling = 2;
    })
  }

  setForDelete(deleteEmail: string) {
    this.deleteEmail = deleteEmail;
    this.modalService.open(this.customerDeleteWarning);
  }
  closeModal() {
    this.deleteEmail = "";
    this.modalService.close(this.customerDeleteWarning);
  }
  deleteRequest() {
    this.apiCalling = 1;
    this.apiService.deleteCustomers(this.deleteEmail).subscribe((data: any) => {
      this.customers = this.customers.filter(c => c.email != this.deleteEmail);
      this.deleteEmail = "";
      this.apiCalling = 2;
      this.closeModal()
    })
  }

  setForEdit(customer: Customer) {
    this.customerForm.setValue({
      name: customer.name,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      imageBase64String: customer.imageBase64String ?? ""
    });
    this.saveMode = 2;
  }
  setForSave() {
    this.saveMode = 1;
    this.resetForm();
  }

  resetForm() {
    this.customerForm.setValue({
      name: "",
      email: "",
      phoneNumber: "",
      imageBase64String: ""
    });
  }
}
