import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user-service';
import { User } from '../../model/user.type';
import { catchError } from 'rxjs';
import { MatDialog, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(private snackBar: MatSnackBar) {}

  users = Array<User>()

  userService = inject(UserService)

  readonly dialog = inject(MatDialog)

  givenName = signal<string | null>(null)
  surname = signal<string | null>(null)

  givenNameEdit = signal<string | null>(null)
  surnameEdit = signal<string | null>(null)

  givenNameError = false
  givenNameErrorMessage = "First name has to be filled in!"
  surnameError = false
  surnameErrorMessage = "Surname has to be filled in!"

  givenNameErrorEdit = false
  givenNameErrorMessageEdit = "First name has to be filled in!"
  surnameErrorEdit = false
  surnameErrorMessageEdit = "Surname has to be filled in!"

  currentlyEditingId: string | null = null
  rowBeingEdited: User | null = null

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
      this.sortData({active: 'firstName', direction: 'asc'})
    })
  }

  onSaveEdit(user: User) {
    if(this.givenNameEdit() == null || this.givenNameEdit() == "") {
      this.givenNameErrorEdit = true
    }
    else if(this.surnameEdit() == null || this.surnameEdit() == "") {
      this.surnameErrorEdit = true
    }
    else if(this.givenNameEdit() == this.rowBeingEdited!.givenName && this.surnameEdit() == this.rowBeingEdited!.surname){
      this.openSnackBar("Nothing saved, due to no changes!")

      this.resetEditingValues()
    }
    else {
      this.addUser({
          userId: user.userId,
          userPrincipleName: this.givenNameEdit()!,
          displayName: this.givenNameEdit()!,
          email: this.givenNameEdit()! + "@yatta.de",
          givenName: this.givenNameEdit()!,
          surname: this.surnameEdit()!,
        })

      this.resetEditingValues()
      }
  }

  onSaveNewUser(){
    if(this.givenName() == null || this.givenName() == "") {
      this.givenNameError = true
    }
    else if(this.surname() == null || this.surname() == "") {
      this.surnameError = true
    }
    else {
      this.addUser({
          userPrincipleName: this.givenName()!,
          displayName: this.givenName()!,
          email: this.givenName()! + "@yatta.de",
          givenName: this.givenName()!,
          surname: this.surname()!,
        })

        this.givenName.set(null)
        this.surname.set(null)
      }
  }

  addUser(user: User) {
    this.userService.addNewUser(user)
      .pipe(catchError((err) => {
            console.log(err)
            throw err;
          }))
      .subscribe(() => {
        this.initializeUsers()
        this.givenName.set(null)
        this.surname.set(null)
        this.openSnackBar("User has been saved!")
      });
  }

  disableErrors() {
    this.givenNameError = false
    this.surnameError = false
  }

  disableEditErrors() {
    this.givenNameErrorEdit = false
    this.surnameErrorEdit = false
  }

  onEdit(newCurrentlyEditingId: string) {
    this.givenNameErrorEdit = false
    this.surnameErrorEdit = false

    if(this.rowBeingEdited != null) {
      const userIndex = this.users.findIndex(user => user.userId == this.currentlyEditingId)
      this.users[userIndex] = this.rowBeingEdited
    }
    
    const newUserBeingEdited = this.users.find(user => user.userId == newCurrentlyEditingId)
    if( newUserBeingEdited != null){
      this.rowBeingEdited = newUserBeingEdited
      this.currentlyEditingId = newUserBeingEdited.userId!

      this.givenNameEdit.set(newUserBeingEdited.givenName)
      this.surnameEdit.set(newUserBeingEdited.surname)
    }
  }

  onCancelEdit() {
    if(this.rowBeingEdited != null) {
      const userIndex = this.users.findIndex(user => user.userId == this.currentlyEditingId)
      this.users[userIndex] = this.rowBeingEdited

      this.resetEditingValues()
    }
  }

  resetEditingValues() {
    this.givenNameEdit.set(null)
    this.surnameEdit.set(null)
    
    this.currentlyEditingId = null
    this.rowBeingEdited = null
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

  openSnackBar (message: string) {
    this.snackBar.open(message, "close")
  }
}