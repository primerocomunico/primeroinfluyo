import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

// Declaramos esta variable para evitar que M genere conflictos de error
// declare var M: any

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.scss']
})
export class EditCampaignComponent implements OnInit {

  // variables para rutas dinámicas
  campaignId: string;

  // comprobar que el usuario es un super-user
  userAdmin: string = localStorage.getItem("userAdmin");

  sub: any;

  // Variable que almacenará los datos
  data: object[] = [];

  constructor(public _api: ApiService, public _router: ActivatedRoute, public _data: DataService) {
    // Obtenemos el ID del routing para después asignar el valor para poder editar la campaña
    this.sub = this._router.params.subscribe((params) => {
      this.campaignId = params['id'];
      //console.log(this.campaignId);
    });
  }
  // Así obtenemos el _id de la campaña

  ngOnInit() {
    this._data.getCampaign(this.campaignId);
  }

  // ngAfterViewInit nos sirve para cargar el código cuando se visualice el component
  /*ngAfterViewInit() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
      onSelect: function(newDate) {
      }
    });
  }*/

  // Función para editar la info del influencer
  update() {
    //console.log(this.campaignId);
    this._data.updateCampaign(
      this.campaignId,
      // Por temas de asincronicidad, debemos coger los valores ya asignados en el service _auth
      this._data.dataCampaign['campaignTitle'],
      this._data.dataCampaign['campaignImg'],
      this._data.dataCampaign['campaignDes'],
      this._data.dataCampaign['campaignStreet'],
      this._data.dataCampaign['campaignCity'],
      this._data.dataCampaign['campaignZipcode'],
      this._data.dataCampaign['campaignUrl'],
      this._data.dataCampaign['campaignDate'],
      // <HTMLInputElement es indicar el tipo sin declarar previamente la variable
      //(<HTMLInputElement>document.getElementById("campaignDate")).value,
      this._data.dataCampaign['campaignConfig'],
      this._data.dataCampaign['campaignFashion'],
      this._data.dataCampaign['campaignFitness'],
      this._data.dataCampaign['campaignFoodie'],
      this._data.dataCampaign['campaignLifestyle'],
      this._data.dataCampaign['campaignBeauty'],
      this._data.dataCampaign['campaignActive'],
      this._data.dataCampaign['campaignBrand']
    )
  }

  // Borrar un influencer
  delete() {
    if(confirm('¿Quieres confirmar la eliminación de esta campaña?')) {
      this._data.deleteCampaign(this.campaignId);
    }
  }

}
