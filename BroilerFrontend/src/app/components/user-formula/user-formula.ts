import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user-service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-user-formula',
  imports: [MatDialogContent, MatFormField, MatLabel, MatDialogActions, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './user-formula.html',
  styleUrl: './user-formula.scss'
})
export class UserFormula {
  userFormulaDialogRef = inject(MatDialogRef<UserFormula>);
  userService = inject(UserService)

  givenName = signal<string | null>(null)
  surname = signal<string | null>(null)

  showError = false
  errorMessage = "All fields need to be filled in!"
  
  readonly dialog = inject(MatDialog)

  onAdd() {
    const isNotGivenName = this.givenName() == null
    const isNotSurname = this.surname()== null

    if(isNotGivenName || isNotSurname){
      this.showError = true;
    }else{
      this.userService.addNewUser({
        userPrincipleName: this.givenName()!,
        displayName: this.givenName()!,
        email: this.givenName()! + "@yatta.de",
        givenName: this.givenName()!,
        surname: this.surname()!,
      })
      .pipe(catchError((err) => {
            this.showError = true
            this.errorMessage = err.message;
            throw err;
          }))
      .subscribe((newUser) => this.userFormulaDialogRef.close(newUser));
    }
  }

  onCancel() {
    this.userFormulaDialogRef.close();
  }
}
