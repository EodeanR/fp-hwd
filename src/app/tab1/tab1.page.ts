import { Component } from '@angular/core';
import { FootballApiService } from '../services/football-api.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  countries: any[] = []
  selectedCountry: string = ''
  leagues: any[] = []

  constructor(private footballApi: FootballApiService, private router: Router, private navCtrl: NavController) {}

  ionViewDidEnter() {
    this.loadCountries();
    this.loadLeagues();
  }

  loadCountries() {
    this.footballApi.getCountries().then((data: any) => {
      this.countries = data.countries;
    }).catch(error => {
      console.error('Error fetching countries', error);
    });
  }
  loadLeagues():any {
    this.footballApi.getAllLeagues().then((data: any) => {
      this.leagues = data.leagues;
    }).catch(error => {
      console.error('Error fetching all leagues', error);
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
      this.leagues = this.loadLeagues()
    }
  }
  onLeagueClick(leagueName: string) {
      this.navCtrl.navigateForward(['teams', leagueName]);
  }
}
