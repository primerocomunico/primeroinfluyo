import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public _api: ApiService, public _router: Router) { }

  sub: any;

  // Variable que almacenará los datos de la llamada GET
  data: object[] = [];
  dataCompany: object[] = [];

  // obtiene los datos de la api del nuevo usuario para utilizarlos como object
  dataNewUser: object;
  dataNewCompany: object;
  // obtiene los datos de la api del usuario registrado para utilizarlos como object
  dataLoginUser: object;
  dataLoginCompany: object;

  // Variables que sirven para alerts y comprobar el login/logout
  flagAlert: boolean = false;
  flagAlertWrong: boolean = false;
  errorLogin: string;

  isLogged: string;
  login() {
    this.isLogged = localStorage.getItem("authUser");
    this._router.navigateByUrl('/bienvenido');
  }
  logout() {
    this.isLogged = undefined;
  }

  //Llamada POST para registrar un nuevo influencer
  registrarNuevoInfluencer(userName: string, userMail: string, userInstagram: string, userPassword: string): void {
    // endpointUrl viene de environments/environment.ts
    this._api.post(environment.endpointUrl + "/newinfluencer", {
      "userName": userName,
      "userMail": userMail,
      "userInstagram": userInstagram,
      "userPassword": userPassword
    })
      .subscribe(
        // Success
        (apiResult: object) => {
          // Debería estar documentado que recibo del backend
          console.log(apiResult);
          console.log(apiResult["message"]);
          this.dataNewUser = apiResult
          if (apiResult["message"] == "el Mail y/o cuenta de Instagram enviado ya existe") {
            // flagAlert sirve para crear el alert y con setTimeout lo borramos
            this.flagAlert = true;
            console.log(this.flagAlert);
            setTimeout(() => { this.flagAlert = false, console.log(this.flagAlert) }, 5000)
            this._router.navigateByUrl('/newinfluencer');
          } else {
            this.flagAlert = true;
            setTimeout(() => { this.flagAlert = false }, 5000)
            this._router.navigateByUrl('/loginfluencer');
          }
        },
        // Error
        (error: string) => { console.log(error) }
      );
  }

  // Llamada POST para que acceda un influencer registrado
  loginInfluencer(userInstagram: string, userPassword: string): void {
    this._api.post(environment.endpointUrl + "/loginfluencer", {
      "userInstagram": userInstagram,
      "userPassword": userPassword
    })
      .subscribe(
        // Success
        (apiResult: object) => {
          // Debería estar documentado que recibo del backend
          this.dataLoginUser = apiResult
          //console.log(this.dataLoginUser);
          // Se compara la clave del objeto con undefined, eso indica que no existe
          if (this.dataLoginUser["wrong"] != undefined) {
            this.logout();
            this._router.navigateByUrl('/loginfluencer');

            // Cambiamos el valor de las flags para aparecer las alerts
            this.flagAlertWrong = true;
            // Regresamos el valor original de las alerts para que desaparezcan
            setTimeout(() => { this.flagAlertWrong = false }, 5000)
            setTimeout(() => { this.errorLogin = this.dataLoginUser["wrong"] }, 5000)
          } else {
            localStorage.setItem("authUser", this.dataLoginUser["token"]);
            // el ID se almacena en el local storage para tenerlo siempre disponible
            localStorage.setItem("authId", this.dataLoginUser["_id"]);
            // tagUser servira para identificar si es un influencer o una empresa
            localStorage.setItem("tagUser", "influencer");
            this.login();
          }
        },
        // Error
        (error: string) => {
          console.log(error)
          this.logout();
        }
      )
  }

  // Llamada GET para poder acceder a los datos de un influencer
  loadDataInfluencer(id: string) {
    this.sub = this._api.get(environment.endpointUrl + "/influencer/" + id, { 'Authorization': `bearer ${localStorage.getItem("authUser")}` })
      .subscribe((apiResult) => {
        this.data = apiResult;

        // Asignamos un valor a estos datos, ya sea vació o false, para que ya exista un registro en la BBDD
        if (this.data['userName'] === undefined) { this.data['userName'] = "" }
        if (this.data['userMail'] === undefined) { this.data['userMail'] = "" }
        if (this.data['userInstagram'] === undefined) { this.data['userInstagram'] = "" }
        if (this.data['userPassword'] === undefined) { this.data['userPassword'] = "" }
        if (this.data['userStreet'] === undefined) { this.data['userStreet'] = "" }
        if (this.data['userCity'] === undefined) { this.data['userCity'] = "" }
        if (this.data['userZipcode'] === undefined) { this.data['userZipcode'] = "" }
        if (this.data['userPhone'] === undefined) { this.data['userPhone'] = "" }
        if (this.data['userBirthday'] === undefined) { this.data['userBirthday'] = "" }
        if (this.data['userSex'] === undefined) { this.data['userSex'] = "" }
        if (this.data['userFashion'] === undefined) { this.data['userFashion'] = false }
        if (this.data['userFitness'] === undefined) { this.data['userFitness'] = false }
        if (this.data['userFoodie'] === undefined) { this.data['userFoodie'] = false }
        if (this.data['userLifestyle'] === undefined) { this.data['userLifestyle'] = false }
        if (this.data['userBeauty'] === undefined) { this.data['userBeauty'] = false }

        //this.data['userPassword'] = "";

        this.flagAlert = true;
        setTimeout(() => { this.flagAlert = false }, 5000)
        this._router.navigateByUrl('/editinfluencer');
      });
  }

  //Llamada PUT para editar un influencer
  updateInfluencer(
    _id: string,
    userName: string,
    userMail: string,
    userInstagram: string,
    userPassword: string,
    userStreet: string,
    userCity: string,
    userZipcode: string,
    userPhone: number,
    userBirthday: string,
    userSex: string,
    userFashion: boolean,
    userFitness: boolean,
    userFoodie: boolean,
    userLifestyle: boolean,
    userBeauty: boolean
  ): void {
    // endpointUrl viene de environments/environment.ts
    this._api.put(environment.endpointUrl + "/influencer", {
      // de aquí devuelve una contraseña modificada
      "_id": _id,
      "userName": userName,
      "userMail": userMail,
      "userInstagram": userInstagram,
      "userPassword": userPassword,
      "userStreet": userStreet,
      "userCity": userCity,
      "userZipcode": userZipcode,
      "userPhone": userPhone,
      "userBirthday": userBirthday,
      "userSex": userSex,
      "userFashion": userFashion,
      "userFitness": userFitness,
      "userFoodie": userFoodie,
      "userLifestyle": userLifestyle,
      "userBeauty": userBeauty
    }, { 'Authorization': `bearer ${localStorage.getItem("authUser")}` })
      .subscribe(
        // Success
        (apiResult: object) => {
          // Debería estar documentado que recibo del backend
          this.dataNewUser = apiResult
          this.flagAlert = true;
          setTimeout(() => { this.flagAlert = false }, 5000)
          this._router.navigateByUrl('/bienvenido');
        },
        // Error
        (error: string) => { console.log(error) }
      );
  }

  // Llamada DELETE para eliminar un influencer
  deleteInfluencer(id: string) {
    this.sub = this._api.delete(environment.endpointUrl + "/influencer/" + id)
      .subscribe(
        // Success
        (apiResult: object) => {
          // Debería estar documentado que recibo del backend
          this.dataNewUser = apiResult
          localStorage.removeItem("authId");
          localStorage.removeItem("authUser");
          localStorage.removeItem("tagUser");
          this.flagAlert = true;
          setTimeout(() => { this.flagAlert = false }, 5000)
          this._router.navigateByUrl('/home');
          console.log(this.dataNewUser);
        },
        // Error
        (error: string) => { console.log(error) }
      );
  }

  //Llamada POST para registrar una nueva empresa
  registrarNuevaEmpresa(
    companyName: string,
    companyPassword: string,
    companyMail: string,
    companyInstagram: string,
    companyStreet: string,
    companyCity: string,
    companyZipcode: string,
    companyPhone: number,
    companyContact: string,
    companyFashion: boolean,
    companyFitness: boolean,
    companyFoodie: boolean,
    companyLifestyle: boolean,
    companyBeauty: boolean,
    companyOther: boolean
  ): void {
    // endpointUrl viene de environments/environment.ts
    this._api.post(environment.endpointUrl + "/newcompany", {
      "companyName": companyName,
      "companyPassword": companyPassword,
      "companyMail": companyMail,
      "companyInstagram": companyInstagram,
      "companyStreet": companyStreet,
      "companyCity": companyCity,
      "companyZipcode": companyZipcode,
      "companyPhone": companyPhone,
      "companyContact": companyContact,
      "companyFashion": companyFashion,
      "companyFitness": companyFitness,
      "companyFoodie": companyFoodie,
      "companyLifestyle": companyLifestyle,
      "companyBeauty": companyBeauty,
      "companyOther": companyOther
    })
      .subscribe(
        // Success
        (apiResult: object) => {
          // Debería estar documentado que recibo del backend
          this.dataNewCompany = apiResult
          if (apiResult["message"] == "El mail enviado ya existe") {
            this.flagAlert = true;
            setTimeout(() => { this.flagAlert = false }, 5000)
            this._router.navigateByUrl('/newcompany');
          } else {
            this.flagAlert = true;
            setTimeout(() => { this.flagAlert = false }, 5000)
            this._router.navigateByUrl('/logincompany');
          }
        },
        // Error
        (error: string) => { console.log(error) }
      );
  }

  // Llamada POST para que acceda una empresa registrado
  loginCompany(companyMail: string, companyPassword: string): void {
    this._api.post(environment.endpointUrl + "/logincompany", {
      "companyMail": companyMail,
      "companyPassword": companyPassword
    })
      .subscribe(
        // Success
        (apiResult: object) => {
          // Debería estar documentado que recibo del backend
          this.dataLoginCompany = apiResult
          // Se compara la clave del objeto con undefined, eso indica que no existe
          if (this.dataLoginCompany["wrong"] != undefined) {
            this.logout();
            this._router.navigateByUrl('/logincompany');

            // Cambiamos el valor de las flags para aparecer las alerts
            this.flagAlertWrong = true;
            // Regresamos el valor original de las alerts para que desaparezcan
            setTimeout(() => { this.flagAlertWrong = false }, 5000)
            setTimeout(() => { this.errorLogin = this.dataLoginCompany["wrong"] }, 5000)
          } else {
            localStorage.setItem("authUser", this.dataLoginCompany["token"]);
            localStorage.setItem("authId", this.dataLoginCompany["_id"]);
            // tagUser servira para identificar si es un influencer o una empresa
            localStorage.setItem("tagUser", "company");
            // TODO Ponemos el mail en el local storage para definir las marcas de las campañas
            localStorage.setItem("userAdmin", companyMail);
            this.login();
          }
        },
        // Error
        (error: string) => {
          console.log(error)
          this.logout();
        }
      )
  }

  // Llamada GET para poder acceder a los datos de una empresa
  loadDataCompany(id: string) {
    
    this.sub = this._api.get(environment.endpointUrl + "/company/" + id, { 'Authorization': `bearer ${localStorage.getItem("authUser")}` })
      .subscribe((apiResult) => {
        this.dataCompany = apiResult;
        // Asignamos un valor a estos datos, ya sea vació o false, para que ya exista un registro en la BBDD
        if (this.dataCompany['companyInstagram'] === undefined) { this.dataCompany['companyInstagram'] = "" }
        if (this.dataCompany['companyFashion'] === undefined) { this.dataCompany['companyFashion'] = false }
        if (this.dataCompany['companyFitness'] === undefined) { this.dataCompany['companyFitness'] = false }
        if (this.dataCompany['companyFoodie'] === undefined) { this.dataCompany['companyFoodie'] = false }
        if (this.dataCompany['companyLifestyle'] === undefined) { this.dataCompany['companyLifestyle'] = false }
        if (this.dataCompany['companyBeauty'] === undefined) { this.dataCompany['companyBeauty'] = false }
        if (this.dataCompany['companyOther'] === undefined) { this.dataCompany['companyOther'] = false }

        //this.data['userPassword'] = "";

        this.flagAlert = true;
        setTimeout(() => { this.flagAlert = false }, 5000)
        this._router.navigateByUrl('/editcompany');
      });
  }

  //Llamada PUT para actualizar una empresa
  editarEmpresa(
    _id: string,
    companyName: string,
    companyPassword: string,
    companyMail: string,
    companyInstagram: string,
    companyStreet: string,
    companyCity: string,
    companyZipcode: string,
    companyPhone: number,
    companyContact: string,
    companyFashion: boolean,
    companyFitness: boolean,
    companyFoodie: boolean,
    companyLifestyle: boolean,
    companyBeauty: boolean,
    companyOther: boolean
  ): void {
    // endpointUrl viene de environments/environment.ts
    this._api.put(environment.endpointUrl + "/company", {
      "_id": _id,
      "companyName": companyName,
      "companyPassword": companyPassword,
      "companyMail": companyMail,
      "companyInstagram": companyInstagram,
      "companyStreet": companyStreet,
      "companyCity": companyCity,
      "companyZipcode": companyZipcode,
      "companyPhone": companyPhone,
      "companyContact": companyContact,
      "companyFashion": companyFashion,
      "companyFitness": companyFitness,
      "companyFoodie": companyFoodie,
      "companyLifestyle": companyLifestyle,
      "companyBeauty": companyBeauty,
      "companyOther": companyOther
    }, { 'Authorization': `bearer ${localStorage.getItem("authUser")}` })
      .subscribe(
        // Success
        (apiResult: object) => {
          // Debería estar documentado que recibo del backend
          this.dataNewUser = apiResult
          this.flagAlert = true;
          setTimeout(() => { this.flagAlert = false }, 5000)
          this._router.navigateByUrl('/bienvenido');
        },
        // Error
        (error: string) => { console.log(error) }
      );
  }

  // Llamada DELETE para eliminar una empresa
  deleteCompany(id: string) {
    this.sub = this._api.delete(environment.endpointUrl + "/company/" + id)
      .subscribe(
        // Success
        (apiResult: object) => {
          // Debería estar documentado que recibo del backend
          this.dataNewCompany = apiResult
          localStorage.removeItem("authId");
          localStorage.removeItem("authUser");
          localStorage.removeItem("tagUser");
          localStorage.removeItem("userAdmin");
          this.flagAlert = true;
          setTimeout(() => { this.flagAlert = false }, 5000)
          this._router.navigateByUrl('/home');
        },
        // Error
        (error: string) => { console.log(error) }
      );
  }

  // Para cerrar el observable
  desuscribirse() {
    this.sub.unsubscribe;
  }

}
