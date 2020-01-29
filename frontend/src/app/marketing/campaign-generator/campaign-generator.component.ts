import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

// Declaramos esta variable para evitar que M genere conflictos de error
// M pertenece a Materialize y sirve para que peuda ejecutarse el calendar
//declare var M: any

@Component({
  selector: 'app-campaign-generator',
  templateUrl: './campaign-generator.component.html',
  styleUrls: ['./campaign-generator.component.scss']
})
export class CampaignGeneratorComponent implements OnInit {

  id: string;
  sub: any;

  campaignTitle: string;
  campaignImg: string;
  campaignDes: string;
  campaignStreet: string;
  campaignCity: string;
  campaignZipcode: string;
  campaignUrl: string;
  campaignDate: string;
  campaignConfig: string;
  campaignBrand: string = this._auth.dataCompany['companyMail'];
  campaignFashion: boolean = false;
  campaignFitness: boolean = false;
  campaignFoodie: boolean = false;
  campaignLifestyle: boolean = false;
  campaignBeauty: boolean = false;
  campaignActive: boolean = false;

  accessUserAdmin: string;

  constructor(public _api: ApiService, public _data: DataService, public _router: ActivatedRoute, public _auth: AuthService) {

    this.id = "";
    // Obtenemos el ID del routing para después asignar el valor para poder editar la campaña
      this.sub = this._router.params.subscribe((params) => {
        this.id = params['id'];
      });
   }

  ngOnInit() {
    // Sirve para obtener el valor userAdmin del localStorage y así tenga acceso como userAdmin
    this.accessUserAdmin = localStorage.getItem("userAdmin");

    if(this.id != "") {
      this._data.getCampaign(this.id);
    }
  }

  // ngAfterViewInit nos sirve para cargar el código cuando se visualice el component
  /*ngAfterViewInit() {
      
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
      onSelect:function(newDate) {
      }
    });
      
  }*/

  create() {
    this._data.createNewCampaign(
      this.campaignTitle,
      this.campaignImg,
      this.campaignDes,
      this.campaignStreet,
      this.campaignCity,
      this.campaignZipcode,
      this.campaignUrl,
      this.campaignDate,
      // <HTMLInputElement es indicar el tipo sin declarar previamente la variable
      //(<HTMLInputElement>document.getElementById("campaignDate")).value,
      this.campaignConfig,
      this.campaignFashion,
      this.campaignFitness,
      this.campaignFoodie,
      this.campaignLifestyle,
      this.campaignBeauty,
      this.campaignActive,
      this.campaignBrand
    )
  }

}
