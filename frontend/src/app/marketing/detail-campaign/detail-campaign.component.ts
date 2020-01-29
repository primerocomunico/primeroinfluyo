import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-detail-campaign',
  templateUrl: './detail-campaign.component.html',
  styleUrls: ['./detail-campaign.component.scss']
})
export class DetailCampaignComponent implements OnInit {

  // variables para rutas dinámicas
  id: string;
  sub: any;

  // Confirmar si es userAdmin
  userAdmin: string = localStorage.getItem('userAdmin');

  // Variable que almacenará los datos
  data: object = {};

  // para confirmar si la campaña pertenece a la marca
  campaignAuth: string = localStorage.getItem('userAdmin');

  // Para confirmar si han accedido como influencer o como empresa
  tagUser: string = localStorage.getItem('tagUser');


  constructor(public _api: ApiService, public _auth: AuthService, public _data: DataService, public _router: ActivatedRoute) {
    // Obtenemos el ID del routing para después asignar el valor para poder editar la campaña
    this.sub = this._router.params.subscribe((params) => {
      this.id = params['id'];
      //console.log(this.id);
    });
  }
  // Así obtenemos el _id de la campaña

  ngOnInit() {
    //this.id = params['id'];
    // Realizar llamada GET utilizando el servicio _api
    this._api.get(`${environment.endpointUrl}/campaign/${this.id}`, { 'Authorization': `bearer ${localStorage.getItem("authUser")}` })
      .subscribe((apiResult) => {
        this.data = apiResult;
        /*console.log(this.data);
        console.log(this.data['campaignBrand']);
        console.log(localStorage.getItem('userAdmin'));*/
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  update() {
    this._data.updateCampaign(
      this.id,
      // Por temas de asincronicidad, debemos coger los valores ya asignados en el service _data
      this._data.data['campaignTitle'],
      this._data.data['campaignImg'],
      this._data.data['campaignDes'],
      this._data.data['campaignStreet'],
      this._data.data['campaignCity'],
      this._data.data['campaignZipcode'],
      this._data.data['campaignUrl'],
      this._data.data['campaignDate'],
      this._data.data['campaignConfig'],
      this._data.data['campaignFashion'],
      this._data.data['campaignFitness'],
      this._data.data['campaignFoodie'],
      this._data.data['campaignLifestyle'],
      this._data.data['campaignBeauty'],
      this._data.data['campaignActive'],
      this._data.data['campaignBrand']
    )
  }

}
