import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/user.type';
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
  diaogRef = inject(MatDialogRef<UserFormula>);
  data = inject<User>(MAT_DIALOG_DATA);
  userService = inject(UserService)

  firstName = signal("")
  lastName = signal("")

  onAdd() {
    this.userService.addNewUser({first_name: this.firstName(), name: this.firstName()})
    .subscribe((newUser) => {
      this.diaogRef.close(newUser)
    })
  }

  onCancel() {
    this.diaogRef.close();
  }
}
