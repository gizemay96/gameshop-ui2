import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressService } from '@app/services/address.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-edit-address',
  templateUrl: './add-edit-address.component.html',
  styleUrls: ['./add-edit-address.component.scss']
})
export class AddEditAddressComponent implements OnInit {


  loading = false;
  errorMessage = '';
  isError = false;

  addressForm = new FormGroup({});


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditAddressComponent>,
    private addressService: AddressService,
    private fb: FormBuilder
  ) {
    const addressData = this.data.address;
    this.addressForm = this.fb.group({
      title: new FormControl(addressData?.title || '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10),
      ]),
      building: new FormControl(addressData?.building || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      street: new FormControl(addressData?.street || '', [Validators.required]),
      city: new FormControl(addressData?.city || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      country: new FormControl(addressData?.country || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      id: new FormControl(addressData?._id || ''),
      userId: new FormControl(this.data.user.id),
    });
  }

  ngOnInit(): void {
  }


  saveAddress() {
    if (this.addressForm.valid) {
      if (this.addressForm.controls['id'].value) {
        this.editData();
      } else {
        this.addAddress();
      }
    } else {
      this.loading = false;
    }
  }


  async editData() {
    this.loading = true;
    const response = await lastValueFrom(this.addressService.editUserAddress(this.addressForm.value));
    if (response.error) {
      this.isError = true;
      this.errorMessage = response.error.responseMessage;
      this.loading = false;
    } else {
      this.loading = false;
      this.close(true);
    }
  }

  async addAddress() {
    this.loading = true;
    const response = await lastValueFrom(this.addressService.addUserAddress(this.addressForm.value));
    if (response.error) {
      this.isError = true;
      this.errorMessage = response.error.responseMessage;
      this.loading = false;
    } else {
      this.loading = false;
      this.close(true);
    }

  }

  close(isSave = false) {
    this.dialogRef.close({ isSave });
  }
}
