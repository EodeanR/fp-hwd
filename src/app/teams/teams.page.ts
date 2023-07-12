import { Component, OnInit } from '@angular/core';
import { FootballApiService } from '../services/football-api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  leagueName: string | null = '';
  isModalOpen = false;
  teams: any[] = [];
  idTeam: string | null= ''
  detailTeam:any = []
  favoriteKey = 'favoriteTeams';
  // foundTeam:any[] = []

  constructor(private route: ActivatedRoute, private FootballApiService: FootballApiService, private http: HttpClient) {}

  ngOnInit():any {
    this.route.paramMap.subscribe((params) => {
      this.leagueName = params.get('leagueName');
      if (this.leagueName !== null) {
        this.FootballApiService.getTeamsByLeague(this.leagueName).subscribe((data: any) => {
          this.teams = data.teams;
        });
      }
    });
  }

//   if (this.idTeam !== null) {
//   this.FootballApiService.getTeamsByLeague(this.idTeam).subscribe((data: any) => {
//     this.detailTeam = data.detailTeam;
//   });
// }
setOpen(isOpen: boolean, id : string|null, league:string|null) {
  if(id){
    this.FootballApiService.getTeamsByLeague(league).subscribe((response: any) => {
      const teams:any[] = response.teams;
      let foundTeam = teams.find(team => team.idTeam === id);
      if (foundTeam) {
        this.detailTeam = foundTeam
        console.log(this.detailTeam);
      } else {
        console.log('Team not found');
      }
    });
  }
  this.isModalOpen = isOpen;
}
favorite(team : any){
  console.log(team);
    const favorites = this.getFavorites();
    favorites.push(team);
    localStorage.setItem(this.favoriteKey, JSON.stringify(favorites));
}
getFavorites(): any[] {
  const favoritesData = localStorage.getItem(this.favoriteKey);
  return favoritesData ? JSON.parse(favoritesData) : [];
}

}