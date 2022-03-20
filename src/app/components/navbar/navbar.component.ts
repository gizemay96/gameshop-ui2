import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/services/auth.service';
import { UserService } from '@app/services/user.service';
import { getUserCart } from '@app/_store/selectors/cart-selector';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userCartCount$: Observable<any> | any;
  user: any;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public translate: TranslateService,
    private store: Store,
    private authService: AuthService
  ) {
    this.store.select(getUserCart).subscribe(res => {
      this.userCartCount$ = res.products?.length || 0;
    });
   }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  openLogin() {
    const data = { panelClass: 'modal-smc' };
    const dialogRef = this.dialog.open(LoginModalComponent, data);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openRegister() {
    const data = { panelClass: 'modal-smc' };
    const dialogRef = this.dialog.open(RegisterModalComponent, data);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logOut(){
    this.authService.logout();
  }


}
