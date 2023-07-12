import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  favoriteList:any=[]
  constructor(private navCtrl: NavController) {}

  ngOnInit():any {
    const data:any = localStorage.getItem('favoriteTeams');
    this.favoriteList = JSON.parse(data)
    console.log(this.favoriteList);

  }
  detailTeam(league : string){
    this.navCtrl.navigateForward(['teams', league]);
  }
  removeFav(id:string){    
    const data = localStorage.getItem('favoriteTeams');
    
    if (data) {
      const parsedData = JSON.parse(data);
      // Find the item with the matching ID
      const index = parsedData.findIndex((item: any) => item.id === id);
      console.log(index);
      
      if (index == -1) {
        // Remove the item from the array
        parsedData.splice(index, 1);

        // Save the updated data back to local storage
        localStorage.setItem('favoriteTeams', JSON.stringify(parsedData));
        location.reload()
      }
    }
  }
  // getFavorites(){
  // }
}
