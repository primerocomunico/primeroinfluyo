import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  sub: any;
  // Donde recibimos toda la información después de hacer una llamada GET
  // deben de iniciarse con un valor vacio para que no marquen error de undefined
  data: object[] = [];
  dataCampaign: object = {};

  objectNewCampaign: object;
  dataEditCampaign: object;

  flagAlert: boolean = false;
  flagAlertDelete: boolean = false;

  constructor(public _api: ApiService, public _router: Router, public _auth: AuthService) { }

  // Llamada GET para publicar todas las campañas
  loadCampaigns() {
    // Hay que reiniciar la variable data para que no se duplique al cargar de nuevo el component al campaigns
    this.data = [];
    this.sub = this._api.get(environment.endpointUrl + "/allcampaigns", { 'Authorization': `bearer ${localStorage.getItem("authUser")}` })
      .subscribe((apiResult) => {
        // Valora cual de las campañas tiene campaignActive = true
        for (let i = 0; i < apiResult.length; i++) {
          if (apiResult[i]["campaignActive"] != false) {
            this.data.push(apiResult[i]);
          }
        }
        // Valora si el userAdmin de localstorage es del super user para mostrar todas las campañas
        if (localStorage.getItem("userAdmin") == "userAdmin") {
          this.data = apiResult
        }
      });
  }

  //Llamada GET para obtener los datos de una campaña
  getCampaign(id: string) {
    this._api.get(environment.endpointUrl + "/campaign/" + id, { 'Authorization': `bearer ${localStorage.getItem("authUser")}` })
      .subscribe((apiResult) => {
        this.dataCampaign = apiResult;

        // Asignamos un valor a estos datos, ya sea vació o false, para que ya exista un registro en la BBDD
        if (this.dataCampaign['campaignTitle'] === undefined) { this.dataCampaign['campaignTitle'] = "" }
        if (this.dataCampaign['campaignImg'] === undefined) { this.dataCampaign['campaignImg'] = "" }
        if (this.dataCampaign['campaignDes'] === undefined) { this.dataCampaign['campaignDes'] = "" }
        if (this.dataCampaign['campaignStreet'] === undefined) { this.dataCampaign['campaignStreet'] = "" }
        if (this.dataCampaign['campaignCity'] === undefined) { this.dataCampaign['campaignCity'] = "" }
        if (this.dataCampaign['campaignZipcode'] === undefined) { this.dataCampaign['campaignZipcode'] = "" }
        if (this.dataCampaign['campaignUrl'] === undefined) { this.dataCampaign['campaignUrl'] = "" }
        if (this.dataCampaign['campaignDate'] === undefined) { this.dataCampaign['campaignDate'] = "" }
        if (this.dataCampaign['campaignConfig'] === undefined) { this.dataCampaign['campaignConfig'] = "" }
        if (this.dataCampaign['campaignFashion'] === undefined) { this.dataCampaign['campaignFashion'] = false }
        if (this.dataCampaign['campaignFitness'] === undefined) { this.dataCampaign['campaignFitness'] = false }
        if (this.dataCampaign['campaignFoodie'] === undefined) { this.dataCampaign['campaignFoodie'] = false }
        if (this.dataCampaign['campaignLifestyle'] === undefined) { this.dataCampaign['campaignLifestyle'] = false }
        if (this.dataCampaign['campaignBeauty'] === undefined) { this.dataCampaign['campaignBeauty'] = false }
        if (this.dataCampaign['campaignActive'] === undefined) { this.dataCampaign['campaignActive'] = false }
        if (this.dataCampaign['campaignBrand'] === undefined) { this.dataCampaign['campaignBrand'] = false }
      })
  }

  //Llamada POST para registrar una nueva campaña
  createNewCampaign(
    campaignTitle: string,
    campaignImg: string,
    campaignDes: string,
    campaignStreet: string,
    campaignCity: string,
    campaignZipcode: string,
    campaignUrl: string,
    campaignDate: string,
    campaignConfig: string,
    campaignFashion: boolean,
    campaignFitness: boolean,
    campaignFoodie: boolean,
    campaignLifestyle: boolean,
    campaignBeauty: boolean,
    campaignActive: boolean,
    campaignBrand: string
  ): void {
    // endpointUrl viene de environments/environment.ts
    this._api.post(environment.endpointUrl + "/newcampaign", {
      "campaignTitle": campaignTitle,
      "campaignImg": campaignImg,
      "campaignDes": campaignDes,
      "campaignStreet": campaignStreet,
      "campaignCity": campaignCity,
      "campaignZipcode": campaignZipcode,
      "campaignUrl": campaignUrl,
      "campaignDate": campaignDate,
      "campaignConfig": campaignConfig,
      "campaignFashion": campaignFashion,
      "campaignFitness": campaignFitness,
      "campaignFoodie": campaignFoodie,
      "campaignLifestyle": campaignLifestyle,
      "campaignBeauty": campaignBeauty,
      "campaignActive": campaignActive,
      "campaignBrand": campaignBrand
    }, { 'Authorization': `bearer ${localStorage.getItem("authUser")}` }
    )
      .subscribe(
        // Success
        (apiResult: object) => {
          // Debería estar documentado que recibo del backend
          this.objectNewCampaign = apiResult
          this.flagAlert = true;
          setTimeout(() => { this.flagAlert = false }, 7000)
          this._router.navigateByUrl('/bienvenido');
        },
        // Error
        (error: string) => { console.log(error) }
      );
  }

  //Llamada PUT para editar una campaña
  updateCampaign(
    _id: string,
    campaignTitle: string,
    campaignImg: string,
    campaignDes: string,
    campaignStreet: string,
    campaignCity: string,
    campaignZipcode: string,
    campaignUrl: string,
    campaignDate: string,
    campaignConfig: string,
    campaignFashion: boolean,
    campaignFitness: boolean,
    campaignFoodie: boolean,
    campaignLifestyle: boolean,
    campaignBeauty: boolean,
    campaignActive: boolean,
    campaignBrand: string
  ): void {
    // endpointUrl viene de environments/environment.ts
    this._api.put(environment.endpointUrl + "/editcampaign", {
      // de aquí devuelve una contraseña modificada
      "_id": _id,
      campaignTitle: campaignTitle,
      campaignImg: campaignImg,
      campaignDes: campaignDes,
      campaignStreet: campaignStreet,
      campaignCity: campaignCity,
      campaignZipcode: campaignZipcode,
      campaignUrl: campaignUrl,
      campaignDate: campaignDate,
      campaignConfig: campaignConfig,
      campaignFashion: campaignFashion,
      campaignFitness: campaignFitness,
      campaignFoodie: campaignFoodie,
      campaignLifestyle: campaignLifestyle,
      campaignBeauty: campaignBeauty,
      campaignActive: campaignActive,
      campaignBrand: campaignBrand
    }, { 'Authorization': `bearer ${localStorage.getItem("authUser")}` })
      .subscribe(
        // Success
        (apiResult: object) => {
          // Debería estar documentado que recibo del backend
          this.dataEditCampaign = apiResult
          this.flagAlert = true;
          setTimeout(() => { this.flagAlert = false }, 5000)
          this._router.navigateByUrl('/bienvenido');
        },
        // Error
        (error: string) => { console.log(error) }
      );
  }

  // Llamada DELETE para eliminar una campaña
  deleteCampaign(id: string) {
    this.sub = this._api.delete(environment.endpointUrl + "/campaign/" + id, { 'Authorization': `bearer ${localStorage.getItem("authUser")}` })
      .subscribe(
        // Success
        (apiResult: object) => {
          // Debería estar documentado que recibo del backend
          this.objectNewCampaign = apiResult
          this.flagAlertDelete = true;
          setTimeout(() => { this.flagAlertDelete = false }, 5000)
          this._router.navigateByUrl('/bienvenido');
        },
        // Error
        (error: string) => { console.log(error) }
      );
  }

}
