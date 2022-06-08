import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { userEditRequestType, userEditResponseType } from '@app/types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }


  editUser(userId: string , editedForm: userEditRequestType) {
    const requestData = { id: userId, ...editedForm };
    const request = this.http.put(`${env.url}/users`, requestData);
    return request.pipe(map((res: userEditResponseType) => res.payload || []), catchError((err) => of(err)));
  }

}
