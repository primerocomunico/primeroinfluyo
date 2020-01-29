import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allcampaigns',
  templateUrl: './allcampaigns.component.html',
  styleUrls: ['./allcampaigns.component.scss']
})
export class AllcampaignsComponent implements OnInit {

  // Necesitamos esta variable para cargar en el localStorage el ID
  dataIdUser: string = localStorage.getItem("authId");
  //Nos sirve para saber si es influencer o company
  tagUser: string = localStorage.getItem("tagUser");
  // Sirve para identificar si accedimos como super user
  userAdmin: string = localStorage.getItem("userAdmin");

  constructor(public _api: ApiService, public _auth: AuthService, public _data: DataService, public _router: ActivatedRoute, public _logout: Router) { }
  
  ngOnInit() {
      this._data.loadCampaigns()
  }

  // Llamada DELETE para eliminar un influencer
  logout() {
    localStorage.removeItem("authId");
    localStorage.removeItem("authUser");
    localStorage.removeItem("tagUser");
    localStorage.removeItem("userAdmin");
    this._logout.navigateByUrl('/home');
  }

}
