import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '@app/services/user.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {



  loading = false;
  errorMessage = '';
  isError = false;

  editForm = new FormGroup({});


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    private userService: UserService,
    private fb: FormBuilder
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
    console.log(this.data)
  }

  async editData() {
    this.isError = false;
    if (this.editForm.valid) {

      this.loading = true;
      const res = await lastValueFrom(this.userService.editUser(this.editForm.value));
      if (res.error) {
        this.isError = true;
        this.errorMessage = res.error.responseMessage;
        this.loading = false;
        return;
      }
      else {
        res.id = res._id;
        window.sessionStorage.setItem('user', JSON.stringify(res));
        this.userService.tryToLogin();
        this.loading = false;
        this.dialogRef.close({ isSave: true });
      }
    } else {
      this.loading = false;
    }
  }

  closeModal() {
    this.dialogRef.close({ isSave: false });
  }

}
