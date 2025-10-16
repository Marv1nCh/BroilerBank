import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { LeaderboardService } from '../../services/leaderboard-service';
import { catchError } from 'rxjs';
import { Leaderboard } from '../../model/leaderboard.type';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FilterCard } from './components/filter-card/filter-card';

@Component({
  selector: 'app-leaderboard',
  imports: [
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FilterCard,
  ],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.scss',
})
export class LeaderboardPage implements OnInit {
  leaderboard = Array<Leaderboard>();
  originalLeaderboard = Array<Leaderboard>();

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
        this.originalLeaderboard = leaderboardFromBackend;
      });
  }

  onFilteredChange(filteredLeaderboard: Array<Leaderboard>) {
    this.leaderboard = filteredLeaderboard;
  }

  onClearFilters = () => (this.leaderboard = this.originalLeaderboard);

  onSearch = (newLeaderboard: Array<Leaderboard>) => (this.leaderboard = newLeaderboard);
}
