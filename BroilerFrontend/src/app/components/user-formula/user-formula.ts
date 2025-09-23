import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user-service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-formula',
  imports: [MatDialogContent, MatFormField, MatLabel, MatDialogActions, FormsModule, MatInputModule],
  templateUrl: './user-formula.html',
  styleUrl: './user-formula.scss'
})
export class UserFormula {
  userFormulaDialogRef = inject(MatDialogRef<UserFormula>);
  userService = inject(UserService)

  firstName = signal("")
  lastName = signal("")

  showError = false
  errorMessage = "All fields need to be filled in!"
  
  readonly dialog = inject(MatDialog)

  onAdd() {
    if (this.firstName().trim() && this.lastName().trim()) {
      this.userService.addNewUser({firstName: this.firstName(), name: this.lastName()})
      .subscribe((newUser) => {
        this.userFormulaDialogRef.close(newUser)
      })
    }else{
      this.showError = true;
    }
  }

  onCancel() {
    this.userFormulaDialogRef.close();
  }
}
