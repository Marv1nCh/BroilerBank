import { Component, inject, OnInit } from '@angular/core';
import {
  MatHeaderCell,
  MatColumnDef,
  MatTableModule,
  MatCellDef,
  MatCell,
  MatHeaderCellDef,
} from '@angular/material/table';
import { LeaderboardService } from '../../services/leaderboard-service';
import { catchError } from 'rxjs';
import { Leaderboard } from '../../model/leaderboard.type';

@Component({
  selector: 'app-leaderboard',
  imports: [MatHeaderCell, MatColumnDef, MatHeaderCellDef, MatCell, MatCellDef, MatTableModule],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.scss',
})
export class LeaderboardPage implements OnInit {
  leaderboard = Array<Leaderboard>();
  leaderboardService = inject(LeaderboardService);

  displayedColumns = ['givenName', 'surname', 'numberOfPurchases', 'completePrice'];

  ngOnInit(): void {
    this.leaderboardService
      .getLeaderboardFromBackend()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((leaderboardFromBackend) => {
        this.leaderboard = leaderboardFromBackend;
      });
  }
}
