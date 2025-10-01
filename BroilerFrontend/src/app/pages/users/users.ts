import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user-service';
import { User } from '../../model/user.type';
import { catchError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserFormula } from '../../components/user-formula/user-formula';
import { MatIconModule } from '@angular/material/icon';
import { MatSortHeader, MatSortModule, Sort } from "@angular/material/sort";
import { compare } from '../../shared/utils';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users',
  imports: [MatTableModule, MatIconModule, MatSortModule, MatSortHeader, MatButtonModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit{
  users = Array<User>()

  userService = inject(UserService)

  readonly dialog = inject(MatDialog)

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

  openDialog() {
    const dialogRef = this.dialog.open(UserFormula)

    dialogRef.afterClosed()
    .subscribe(result => {
      if (result != undefined) {
        this.users.push( {
          userPrincipleName: result.userPrincipleName, 
          displayName: result.displayName, 
          email:result.email, 
          givenName: result.givenName, 
          surname: result.surname})
      }
    })
  }

  formatDateToString(date: Date) {
    return new Date(date).toDateString();
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction == ''){
      return
    }

    this.users.sort((a, b) => {
      const isAsc = sort.direction == 'asc'
      switch (sort.active) {
        case 'firstName':
          return compare(a.givenName, b.givenName, isAsc)
        case 'name':
          return compare(a.surname, b.surname, isAsc)
        default:
          return 0;
      }
    })
  }
}