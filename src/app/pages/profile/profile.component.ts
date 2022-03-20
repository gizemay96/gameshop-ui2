import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditAddressComponent } from '@app/components/add-edit-address/add-edit-address.component';
import { EditProfileComponent } from '@app/components/edit-profile/edit-profile.component';
import { AddressService } from '@app/services/address.service';
import { User } from '@app/types/user.type';
import { getAuthResponse } from '@app/_store/selectors/user-selector';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = false;
  activeTab = 0;

  user: User | any;
  userAddresses: any;

  constructor(
    private addressService: AddressService,
    public dialog: MatDialog,
    public translate: TranslateService,
    private store: Store
  ) {
    this.store.select(getAuthResponse).subscribe(res => {
      this.user = res;
    });
  }

  ngOnInit(): void {
    this.userInfo();
  }


  async userInfo() {
    this.userAddresses = await lastValueFrom(this.addressService.fetchUserAddress());
  }

  addEditAddress(address?: any) {
    const data = { panelClass: 'modal-smc', data: { address, user: this.user } };
    const dialogRef = this.dialog.open(AddEditAddressComponent, data);

    dialogRef.afterClosed().subscribe(result => {
      if (result.isSave) {
        this.userInfo();
      }
    });
  }

  async deleteAddress(address: any) {
    const res = await lastValueFrom(this.addressService.deleteAddress(address._id));
    if (res) {
      this.userInfo();
    }
  }


  editProfile() {
    const data = { panelClass: 'modal-smc', data: this.user };
    const dialogRef = this.dialog.open(EditProfileComponent, data);
    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
