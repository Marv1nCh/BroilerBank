import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user-service';
import { User } from '../../model/user.type';
import { catchError } from 'rxjs';
import { MatDialog, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { UserFormula } from '../../components/user-formula/user-formula';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from "@angular/material/sort";
import { compare } from '../../shared/utils';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-users',
  imports: [MatTableModule, MatIconModule, MatSortModule, MatButtonModule,
    MatDialogModule, MatFormField, MatLabel, MatInputModule,
    ReactiveFormsModule, FormsModule, MatDialogContent,
    MatDatepickerModule, MatSelectModule, MatAutocompleteModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit{
  users = Array<User>()

  userService = inject(UserService)

  readonly dialog = inject(MatDialog)

  givenName = signal<string | null>(null)
  surname = signal<string | null>(null)

  givenNameError = false
  givenNameErrorMessage = "First name has to be filled in!"
  surnameError = false
  surnameErrorMessage = "Surname has to be filled in!"

  ngOnInit(): void {
    this.initializeUsers()
  }

  initializeUsers() {
    this.userService.getAllUsersFromBackend()
    .pipe(catchError((err) => {
      console.log(err);
      throw err;
    }))
    .subscribe((usersFromBackend) => {
      this.users = usersFromBackend
    })
  }

  onAdd() {
    if(this.givenName() == null || this.givenName() == "") {
      this.givenNameError = true
    }
    if(this.surname() == null || this.surname() == "") {
      this.surnameError = true
    }

    if (this.givenName() != null && this.givenName() != "" && this.surname() != null && this.surname() != "") {
      this.userService.addNewUser({
        userPrincipleName: this.givenName()!,
        displayName: this.givenName()!,
        email: this.givenName()! + "@yatta.de",
        givenName: this.givenName()!,
        surname: this.surname()!,
      })
        .pipe(catchError((err) => {
              console.log(err)
              throw err;
            }))
        .subscribe(() => {
          this.initializeUsers()
          this.givenName.set(null)
          this.surname.set(null)
        });
      }
  }

  disableErrors() {
    this.givenNameError = false
    this.surnameError = false
  }

  openDialog(user?: User) {
    const dialogRef = this.dialog.open(UserFormula, {
      autoFocus: false,
      data: {
        update: user != null,
        user: user
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result != undefined) {
          this.initializeUsers()
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