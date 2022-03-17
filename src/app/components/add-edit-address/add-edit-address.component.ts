import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressService } from '@app/services/address.service';
import { AuthService } from '@app/services/auth.service';
import { CartService } from '@app/services/cart.service';
import { UserService } from '@app/services/user.service';
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
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private addressService: AddressService,
    private fb: FormBuilder
  ) {

    this.addressForm = this.fb.group({
      title: new FormControl(this.data?.title || '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10),
      ]),
      building: new FormControl(this.data?.building || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      street: new FormControl(this.data?.street || '', [Validators.required]),
      city: new FormControl(this.data?.city || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      country: new FormControl(this.data?.country || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      id: new FormControl(this.data?._id || ''),
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
      this.dialogRef.close({isSave: true});
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
      this.dialogRef.close({isSave: true});
    }

  }

  close() {
    this.dialogRef.close({isSave: false});
  }
}
