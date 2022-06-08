import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { User } from '@app/types/user.type';
import { autoLogout } from '@app/_store/actions/user-actions';
import { getUserCart } from '@app/_store/selectors/cart-selector';
import { getAuthResponse } from '@app/_store/selectors/user-selector';
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
  @Input() sideNav: MatDrawer;
  @Input() navActions: any;
  @Input() userCartCount: any;

  user: User;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public translate: TranslateService,
    private store: Store,
  ) {
    this.store.select(getAuthResponse).subscribe(res => {
      this.user = res.userDetail || res;
    });
  }

  ngOnInit(): void {
  }

  changeLang(lang){
   this.translate.setDefaultLang(lang);
   sessionStorage.setItem('defaultLang' , lang);
  }

  openLogin() {
    const data = { panelClass: 'modal-smc' };
    this.dialog.open(LoginModalComponent, data);
  }

  openRegister() {
    const data = { panelClass: 'modal-smc' };
    this.dialog.open(RegisterModalComponent, data);
  }

  logOut() {
    this.store.dispatch(autoLogout());
  }

  get ActiveLang(){
   return sessionStorage.getItem('defaultLang');
  }

  navigate(page) {
    this.router.navigateByUrl(page);
  }

}
