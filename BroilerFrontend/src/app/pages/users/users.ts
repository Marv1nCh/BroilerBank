import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user-service';
import { User } from '../../model/user.type';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [MatTableModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit{
  displayedColumns: string[] = ['first_name', 'name']
  userService = inject(UserService)
  users = Array<User>()

  ngOnInit(): void {
    this.userService.getAllUsersFromBackend()
    .pipe(catchError((err) => {
      console.log(err);
      throw err;
    }))
    .subscribe((usersFromBackend) => {
      this.users = usersFromBackend
    })
  }
}
