import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { catchError } from 'rxjs';
import { UserService } from '../../../services/user-service';
import { SnackbarService } from '../../../services/components/snackbar-service';

@Component({
  selector: 'app-add-user-dialog',
  imports: [
    MatDialogContent,
    MatFormFieldModule,
    MatLabel,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-user-dialog.html',
  styleUrl: './add-user-dialog.scss',
})
export class AddUserDialog {
  userService = inject(UserService);
  snackbarService = inject(SnackbarService);

  givenName = signal<string | null>(null);
  surname = signal<string | null>(null);

  givenNameError = false;
  givenNameErrorMessage = 'First name has to be filled in!';
  surnameError = false;
  surnameErrorMessage = 'Surname has to be filled in!';

  readonly dialogRef = inject(MatDialogRef<AddUserDialog>);

  disableErrors() {
    this.givenNameError = false;
    this.surnameError = false;
  }

  onSave() {
    const givenName = this.givenName();
    const surname = this.surname();

    const isGivenNameInvalid = !givenName?.trim();
    const isSurnameInvalid = !surname?.trim();

    this.givenNameError = isGivenNameInvalid;
    this.surnameError = isSurnameInvalid;

    if (isGivenNameInvalid || isSurnameInvalid) {
      return;
    }

    this.addUser();

    this.exit();
  }

  exit() {
    this.dialogRef.close();
  }

  addUser() {
    const newUser = {
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

        this.exit();
      });
  }
}
