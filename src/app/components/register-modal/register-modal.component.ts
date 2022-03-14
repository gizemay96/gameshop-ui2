import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@app/services/auth.service';
import { CartService } from '@app/services/cart.service';
import { UserService } from '@app/services/user.service';
import { lastValueFrom } from 'rxjs';

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
  serverErrors = '';
  errorActive = false;

  registerForm = new FormGroup({
    fullName: new FormControl('', [
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
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
  }


  async register() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const response = await lastValueFrom(this.authService.register(this.registerForm.value));

      if (response.error) {
        this.serverErrors = response.error.responseMessage;
        this.errorActive = true;
        this.isLoading = false;
      } else if (response) {
        response.userDetail.id = response.userDetail._id;
        window.sessionStorage.setItem('user', JSON.stringify(response.userDetail));
        await this.authService.setToken(response.token);
        await this.userService.setUser(response.userDetail);
        await this.cartService.updateBasket(response.userDetail._id);
        this.registerForm.reset();

        this.isLoading = false;
        this.userService.getDetails();
        this.dialogRef.close();
      }
    } else {
      this.isLoading = false;
    }
  }

  close() {
    this.dialogRef.close();
  }

}
