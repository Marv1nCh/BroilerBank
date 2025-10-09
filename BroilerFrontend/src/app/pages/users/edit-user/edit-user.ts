import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../../services/user-service';
import { SnackbarService } from '../../../services/components/snackbar-service';
import { User } from '../../../model/user.type';
import { catchError } from 'rxjs';

@Component({
  selector: '[appEditUser]',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss',
})
export class EditUser implements OnInit {
  userService = inject(UserService);
  snackbarService = inject(SnackbarService);

  givenName = signal<string | null>(null);
  surname = signal<string | null>(null);

  givenNameError = false;
  givenNameErrorMessage = 'First name has to be filled in!';
  surnameError = false;
  surnameErrorMessage = 'Surname has to be filled in!';

  user = input.required<User>();
  isNewUser = input.required<boolean>();
  isCanceled = output<boolean>();
  isSaved = output<boolean>();

  ngOnInit(): void {
    this.givenName.set(this.user().givenName);
    this.surname.set(this.user().surname);
  }

  onSave() {
    const givenName = this.givenName()
    const surname = this.surname()

    const isGivenNameInvalid = !givenName?.trim();
    const isSurnameInvalid = !surname?.trim();

    this.givenNameError = isGivenNameInvalid
    this.surnameError = isSurnameInvalid

    if(isGivenNameInvalid || isSurnameInvalid){
      return
    }

    const isUnchanged =
      !this.isNewUser() &&
      givenName === this.user().givenName &&
      surname === this.user().surname;
    
    if(isUnchanged){
      this.snackbarService.open('Nothing saved, due to no changes!');
      return
    }
    
    this.addUser();

    this.resetEditingValues();
  }

  exit() {
    this.resetEditingValues();

    this.isCanceled.emit(true);
  }

  addUser() {
    const newUser = {
      userId: this.user().userId,
      userPrincipleName: this.givenName()!,
      displayName: this.givenName()!,
      email: this.givenName()! + '@yatta.de',
      givenName: this.givenName()!,
      surname: this.surname()!,
    };

    this.userService
      .addNewUser(newUser)
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe(() => {
        this.givenName.set(null);
        this.surname.set(null);
        this.snackbarService.open('User has been saved!');
        
        this.isSaved.emit(true)

        this.exit();
      });
  }

  resetEditingValues() {
    this.givenName.set(null);
    this.surname.set(null);
  }

  disableErrors() {
    this.givenNameError = false;
    this.surnameError = false;
  }
}