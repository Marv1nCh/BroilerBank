import { Component, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user-service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { catchError } from 'rxjs';
import { User } from '../../model/user.type';

@Component({
  selector: 'app-user-formula',
  imports: [MatDialogContent, MatFormField, MatLabel, MatDialogActions, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './user-formula.html',
  styleUrl: './user-formula.scss'
})
export class UserFormula implements OnInit{
    data = inject(MAT_DIALOG_DATA) as {
      update: boolean,
      user: User
    };

  userFormulaDialogRef = inject(MatDialogRef<UserFormula>);
  userService = inject(UserService)

  givenName = signal<string | null>(null)
  surname = signal<string | null>(null)

  userId = ""

  showError = false
  errorMessage = "All fields need to be filled in!"

  ngOnInit(): void {
    if(this.data.update){
      this.givenName.set(this.data.user.givenName)
      this.surname.set(this.data.user.surname)
      this.userId = this.data.user.userId!
    }
  }

  onAdd() {
    const isNotGivenName = this.givenName() == null
    const isNotSurname = this.surname()== null

    if(isNotGivenName || isNotSurname){
      this.showError = true;
    }else{
      this.userService.addNewUser({
        userId: this.userId,
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
