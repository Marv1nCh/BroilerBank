import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { emptyUser, User } from '../../model/user.type';
import { catchError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarService } from '../../services/components/snackbar-service';
import { EditUser } from './edit-user/edit-user';
import { sortUserData } from '../../shared/sort-utils';

@Component({
  selector: 'app-users',
  imports: [
    MatIconModule,
    MatSortModule,
    MatButtonModule,
    EditUser,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  users = Array<User>();

  userService = inject(UserService);
  snackbarService = inject(SnackbarService);

  currentlyEditingId: string | null = null;

  emptyUser = emptyUser();

  ngOnInit(): void {
    this.initializeUsers();
  }

  initializeUsers() {
    this.userService
      .getAllUsersFromBackend()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((usersFromBackend) => {
        this.users = usersFromBackend;
        this.sortData({ active: 'firstName', direction: 'asc' });
      });
  }

  onEdit = (newCurrentlyEditingId: string) => (this.currentlyEditingId = newCurrentlyEditingId);

  onCancelEdit() {
    this.currentlyEditingId = null;
    this.initializeUsers();
  }

  formatDateToString = (date: Date) => new Date(date).toDateString();

  sortData = (sort: Sort) => sortUserData(sort, this.users);
}
