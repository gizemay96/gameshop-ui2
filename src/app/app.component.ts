import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { UserService } from './services/user.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: any
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'tr']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.userService.tryToLogin();
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

}
