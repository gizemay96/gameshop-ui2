import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '@app/services/common.service';
import { UserService } from '@app/services/user.service';
import { User } from '@app/types/user.type';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  loading: boolean = false;
  errorMessage: string = '';
  isError: boolean = false;

  editForm = new FormGroup({});


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    private userService: UserService,
    private fb: FormBuilder,
    public commonService: CommonService
  ) {

    this.editForm = this.fb.group({
      firstName: new FormControl(this.data?.firstName, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(this.data?.email || '', [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.data?.phoneNumber || '', [Validators.maxLength(11)]),
      id: new FormControl(this.data?.id || ''),
    });
  }

  ngOnInit(): void {
  }

  async editData() {
    this.isError = false;
    if (this.editForm.valid) {

      this.loading = true;
      const res: User = await lastValueFrom(this.userService.editUser(this.data.id , this.editForm.value));
      console.log(res)
      if (res._id) {
        res.id = res._id;
        window.sessionStorage.setItem('user', JSON.stringify(res));
        this.loading = false;
        this.dialogRef.close({ isSave: true });
        this.commonService.openSuccessSnackBar('user-updated');
      }
    } else {
      this.loading = false;
    }
  }

  closeModal() {
    this.dialogRef.close({ isSave: false });
  }

}
