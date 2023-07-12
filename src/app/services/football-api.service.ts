import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FootballApiService {
    private apiUrl = 'https://www.thesportsdb.com/api/v1/json/3/';

  constructor(private http: HttpClient) {}

  getCountries() {
    const url = `${this.apiUrl}all_countries.php`;
    
    return this.http.get(url).toPromise();
  }
  getAllLeagues() {
    const url = `${this.apiUrl}all_leagues.php`;
    return this.http.get(url).toPromise();
  }
  getLeaguesByCountry(country: string) {
    const url = `${this.apiUrl}search_all_leagues.php?c=${country}`;
    return this.http.get(url).toPromise();
  }
  getTeamsByLeague(leagueName: string | null) {
    const url = `${this.apiUrl}/search_all_teams.php?l=${leagueName}`;
    return this.http.get(url);
  }
}
