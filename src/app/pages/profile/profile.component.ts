import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditAddressComponent } from '@app/components/add-edit-address/add-edit-address.component';
import { ConfirmationModalComponent } from '@app/components/confirmation-modal/confirmation-modal.component';
import { EditProfileComponent } from '@app/components/edit-profile/edit-profile.component';
import { AddressService } from '@app/services/address.service';
import { Address } from '@app/types/address.type';
import { User } from '@app/types/user.type';
import { getUserAddresses } from '@app/_store/actions/address-actions';
import { autoLogin } from '@app/_store/actions/user-actions';
import { getAddressResponse } from '@app/_store/selectors/address-selector';
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
  loading: boolean = false;
  activeTab: number = 0;

  user: User;
  userAddresses: Address[] = [];

  constructor(
    private addressService: AddressService,
    public dialog: MatDialog,
    public translate: TranslateService,
    private store: Store
  ) {
    this.store.select(getAuthResponse).subscribe(res => {
      this.user = res.userDetail || res;
    });

    this.store.select(getAddressResponse).subscribe((res: Address[]) => {
      console.log(res)
      this.userAddresses = res;
    });
  }

  ngOnInit(): void {
  }


  addEditAddress(address?: Address) {
    const data = { panelClass: 'modal-smc', data: { address, user: this.user } };
    const dialogRef = this.dialog.open(AddEditAddressComponent, data);

    dialogRef.afterClosed().subscribe(result => {
      if (result.isSave) {
        this.store.dispatch(getUserAddresses(this.user));
      }
    });
  }

  async deleteAddress(address: Address) {
    const res = await lastValueFrom(this.addressService.deleteAddress(address._id));
    if (res) {
      this.store.dispatch(getUserAddresses(this.user));
    }
  }

  editProfile() {
    const data = { panelClass: 'modal-smc', data: this.user };
    const dialogRef = this.dialog.open(EditProfileComponent, data);
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.isSave) {
        this.store.dispatch(autoLogin());
      }
    });
  }


  confirmationModal(address: Address) {
    const message = this.translate.instant('alert-messages.general-delete', { item: address.title });
    const data = { panelClass: 'modal-smc', data: message };
    const dialogRef = this.dialog.open(ConfirmationModalComponent, data);
    dialogRef.afterClosed().subscribe(answer => {
      if (answer.isYes) {
        this.deleteAddress(address);
      }
    });
  }


}
