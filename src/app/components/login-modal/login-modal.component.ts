import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@app/services/auth.service';
import { CartService } from '@app/services/cart.service';
import { DataService } from '@app/services/data.service';
import { UserService } from '@app/services/user.service';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  isLoading = false;
  serverErrors = '';
  errorActive = false;

  loginForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService,
    private dataService: DataService,
    public dialogRef: MatDialogRef<LoginModalComponent>
  ) { }

  ngOnInit(): void {
  }

  async login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const response = await this.authService.login(this.loginForm.value).toPromise();
      if (response.error) {
        this.serverErrors = response.error.responseMessage;
        this.errorActive = true;
        this.isLoading = false;
      } else if (response) {
        window.sessionStorage.setItem('user', JSON.stringify(response.userDetail));
        this.authService.setToken(response.token);
        this.userService.setUser(response.userDetail);

        const userCart = await this.cartService.fetchUserBasket(response.userDetail.id).toPromise();
        this.dataService.setData('userCart', userCart);

        this.isLoading = false;
        this.loginForm.reset();
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
