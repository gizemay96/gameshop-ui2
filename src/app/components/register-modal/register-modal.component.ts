import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { registerUser } from '@app/_store/actions/user-actions';
import { getAuthResponse } from '@app/_store/selectors/user-selector';
import { Store } from '@ngrx/store';

export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  let notMatched = password?.value === confirmPassword?.value ? false : true;
  if (notMatched) {
    confirmPassword?.setErrors({ notmatched: true })
  }
  return password?.value === confirmPassword?.value ? null : { notmatched: true };
};
@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

  isLoading = false;
  errorMessage = '';
  isError = false;

  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  }, { validators: passwordMatchingValidatior });


  constructor(
    public dialogRef: MatDialogRef<RegisterModalComponent>,
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


  async register() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.store.dispatch(registerUser(this.registerForm.getRawValue()));

    } else {
      this.isLoading = false;
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

}
