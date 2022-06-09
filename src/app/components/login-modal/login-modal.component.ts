import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { loginUser } from '@app/_store/actions/user-actions';
import { getAuthResponse } from '@app/_store/selectors/user-selector';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  isLoading: boolean = false;
  errorMessage: string = '';
  isError: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });


  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>,
    private store: Store
  ) {
    this.store.select(getAuthResponse).subscribe(res => {
      if(res.error){
        this.isError = true;
        this.errorMessage = res.error.responseMessage;
      } else if(res && res.userDetail) {
        this.closeModal();
      }
    });
   }

  ngOnInit(): void {
  }

  async login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.store.dispatch(loginUser(this.loginForm.getRawValue()));

    } else {
      this.isLoading = false;
    }
  }

  closeModal() {
    this.dialogRef.close();
  }



}
