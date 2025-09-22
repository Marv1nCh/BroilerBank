import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user-service';
import { User } from '../../model/user.type';
import { catchError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserFormula } from '../../components/user-formula/user-formula';

@Component({
  selector: 'app-users',
  imports: [MatTableModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit{
  displayedColumns: string[] = ['first_name', 'name']
  userService = inject(UserService)
  users = Array<User>()

  readonly dialog = inject(MatDialog)
  @ViewChild('userTable', {static: true, read: MatTable}) table: any

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
    const dialogRef = this.dialog.open(UserFormula, {})

    dialogRef.afterClosed()
    .subscribe(result => {
      if (result != undefined) {
        this.users.push( {first_name: result.first_name, name: result.name})
        this.table.renderRows()
      }
    })
  }
}
