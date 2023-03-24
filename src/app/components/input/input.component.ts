import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAddress } from 'src/app/interfaces/iaddress';
import { IInput } from 'src/app/interfaces/iinput';
import { IInputDetails } from 'src/app/interfaces/iinput-details';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  private currentInput?: IInput;
  public addresses: IAddress[] = [];
  public address?: IAddress;
  public addressesLoading: boolean = false;
  public form?: FormGroup;
  public inputDetails?: IInputDetails;
  public streetId: number = 0;

  constructor(private apiService: ApiServiceService, private fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getCurrentInput();
    this.getAllAddresses();
  }

  getCurrentInput() {
    this.apiService.getCurrentInput().subscribe(
      (res) => {
        this.currentInput = res;
      },
      (err) => console.log(err)
    );
  }

  getAllAddresses() {
    this.addressesLoading = true;
    this.apiService.getAllAddresses().subscribe(
      (res) => {
        this.addresses = res;
        this.addressesLoading = false;
      },
      (err) => console.log(err)
    );
  }

  getAddressDetails(e: Event) {
    if (!isNaN(Number(e))) {
      this.apiService.getAddressDetails(Number(e)).subscribe((res) => {
        this.address = res;
        this.streetId = Number(e);
        this.addFormData(res);
      });
    } else {
      this.form?.reset();
    }
  }

  addInput() {
    this.inputDetails = {
      inputId: this.currentInput?.id!,
      streetId: this.streetId,
      ammount: 350.0,
      inputDate: new Date().toLocaleString(),
    };

    this.apiService.saveInputDetails(this.inputDetails).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
    this.form?.reset();
  }

  initializeForm() {
    this.form = this.fb.group({
      name: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      cellPhone: [{ value: '', disabled: true }],
      addressId: [''],
    });
  }

  addFormData(adr: IAddress) {
    this.form?.setValue({
      name: adr.name,
      address: adr.street + adr.number,
      email: adr.email,
      cellPhone: '656-297-2754',
      addressId: this.streetId,
    });
  }
}
