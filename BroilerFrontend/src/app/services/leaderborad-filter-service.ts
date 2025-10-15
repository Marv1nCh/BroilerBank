import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Leaderboard } from '../model/leaderboard.type';
import { environment } from '../../environments/environment';
import { mapDateToString } from '../shared/utils';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardFilterService {
  http = inject(HttpClient);

  filterLeaderboardByWeek(startDate: Date, endDate: Date) {
    const params: any = {};
    params.start = mapDateToString(startDate);
    params.end = mapDateToString(endDate);
    return this.http.get<Array<Leaderboard>>(environment.apiPath + '/leaderboard/inRange', {
      params,
    });
  }

  filterLeaderboardByMonth(date: Date) {
    const params: any = {};
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    params.start = mapDateToString(new Date(year, month, 1));
    params.end = mapDateToString(new Date(year, month, lastDayOfMonth));

    return this.http.get<Array<Leaderboard>>(environment.apiPath + '/leaderboard/inRange', {
      params,
    });
  }

  filterLeaderboardByYear(date: Date) {
    const params: any = {};
    const year = date.getFullYear();

    params.start = mapDateToString(new Date(year, 0, 1));
    params.end = mapDateToString(new Date(year + 1, 0, 0));

    return this.http.get<Array<Leaderboard>>(environment.apiPath + '/leaderboard/inRange', {
      params,
    });
  }
}
