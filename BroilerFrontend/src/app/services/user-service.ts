import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../model/user.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient)

  getAllUsersFromBackend(){
    return this.http.get<Array<User>>(environment.apiPath + "/users");
  }

  addNewUser(user: User) {
    return this.http.post<User>(environment.apiPath + "/users", user)
  }
}
