import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { autoLogin } from './_store/actions/user-actions';
import { NavbarComponent } from './components/navbar/navbar.component';
import { getAuthResponse } from './_store/selectors/user-selector';
import { Observable } from 'rxjs';
import { getUserCart } from './_store/selectors/cart-selector';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('nav') navbar: NavbarComponent;
  @ViewChild('drawer') drawer: MatDrawer;

  user: any;
  userCartCount$: Observable<any>;

  constructor(
    public dialog: MatDialog,
    public translate: TranslateService,
    private store: Store,
    private router: Router
  ) {
    translate.addLangs(['en', 'tr']);
    const defaultLang = sessionStorage.getItem('defaultLang') || 'en';
    translate.setDefaultLang(defaultLang);
    sessionStorage.setItem('defaultLang', defaultLang);

    this.store.select(getAuthResponse).subscribe(res => {
      this.user = res.userDetail || res;
    });

    this.store.select(getUserCart).subscribe(res => {
      this.userCartCount$ = res.totalQty || 0;
    });

  }

  ngOnInit() {
    this.store.dispatch(autoLogin());
  }

  navbarActions(action, actionValue, forRouting = false) {
    if (forRouting) {
      this.router.navigate([action]);
      setTimeout(() => {
        this.drawer.toggle();
      }, 150);
      return;
    }
    this.navbar[action](actionValue);
  }

  get ActiveLang() {
    return sessionStorage.getItem('defaultLang');
  }

  scrollTop(){
    window.scrollTo(0,0)
  }


}
