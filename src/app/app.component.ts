import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { autoLogin } from './_store/actions/user-actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    public dialog: MatDialog,
    public translate: TranslateService,
    private store: Store
  ) {
    translate.addLangs(['en', 'tr']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.store.dispatch(autoLogin());
  }


}
