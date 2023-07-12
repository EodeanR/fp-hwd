import { Component } from '@angular/core';
import { FootballApiService } from '../services/football-api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  countries: any[] = [];
  selectedCountry: string = '';
  leagues: any[] = [];

  constructor(private footballApi: FootballApiService) {}

  ionViewDidEnter() {
    this.loadCountries();
  }

  loadCountries() {
    this.footballApi.getCountries().then((data: any) => {
      this.countries = data.countries;
    }).catch(error => {
      console.error('Error fetching countries', error);
    });
  }

  onCountryChange() {
    if (this.selectedCountry) {
      this.footballApi.getLeaguesByCountry(this.selectedCountry).then((data: any) => {
        this.leagues = data?.countries || [];
      }).catch(error => {
        console.error(`Error fetching leagues for ${this.selectedCountry}`, error);
      });
    } else {
      this.leagues = [];
    }
  }

}
