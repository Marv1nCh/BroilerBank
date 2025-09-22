import { Component, inject, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase-service';
import { Purchase } from '../../model/purchase.type';
import { catchError } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user-service';
import { User } from '../../model/user.type';

@Component({
  selector: 'app-purchases',
  imports: [MatTableModule],
  templateUrl: './purchases.html',
  styleUrl: './purchases.scss'
})
export class Purchases implements OnInit {
  displayedColumns: string[] = ['first_name', 'last_name', 'date', 'broiler', 'fries', 'coleslaw', 'paid']
  purchases = Array<Purchase>()
  users = Array<User>()
  
  purchaseService = inject(PurchaseService)
  userService = inject(UserService)

  ngOnInit(): void {
    this.purchaseService.getAllPurchasesFromBackend()
    .pipe(catchError((err) => {
      console.log(err)
      throw err;
    }))
    .subscribe((purchasesFromBackend) => {
      this.purchases = purchasesFromBackend
    });

    this.userService.getAllUsersFromBackend()
    .pipe(catchError((err) => {
      console.log(err)
      throw err;
    }))
    .subscribe((usersFromBackend) => {
      this.users = usersFromBackend
    });
  }

  mapIdToUser(userId: number) {
    return this.users.find((user) => user.id == userId);
  }

  formatDateToString(date: Date) {
    return new Date(date).toDateString();
  }
}
