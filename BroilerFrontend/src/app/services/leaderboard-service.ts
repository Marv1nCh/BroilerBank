import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Leaderboard } from '../model/leaderboard.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  http = inject(HttpClient)
  
  getLeaderboardFromBackend() {
    return this.http.get<Array<Leaderboard>>(environment.apiPath + "/leaderboard")
  }
}
