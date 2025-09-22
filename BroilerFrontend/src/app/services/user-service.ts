import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../model/user.type';
import { AppConstants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient)

  getAllUsersFromBackend(){
    return this.http.get<Array<User>>(AppConstants.BASE_URL + "/users");
  }
}
