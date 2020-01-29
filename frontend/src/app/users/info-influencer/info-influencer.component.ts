import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

// Declaramos esta variable para evitar que M genere conflictos de error
//declare var M: any

@Component({
  selector: 'app-info-influencer',
  templateUrl: './info-influencer.component.html',
  styleUrls: ['./info-influencer.component.scss']
})
export class InfoInfluencerComponent implements OnInit {

  // variables para rutas dinámicas
  // id para saber de que influencer se trata
  id: number;
  sub: any;
  birthday: string;
  userPassword: string = "";

  // Podemos utilizar el ID como identificador fijo del user
  dataIdUser: string = localStorage.getItem("authId");

  // Variables para poder actualizar la info del influencer
  _id: string = this.dataIdUser;

  constructor(public _api: ApiService, public _auth: AuthService, public _router: ActivatedRoute) { }

    ngOnInit() {
      this._auth.loadDataInfluencer(this.dataIdUser);
    }

    // ngAfterViewInit nos sirve para cargar el código cuando se visualice el component
    /*ngAfterViewInit() {
      var elems = document.querySelectorAll('.datepicker');
      var instances = M.Datepicker.init(elems, {
        onSelect:function(newDate) {
        }
      });
    }*/

  // Función para editar la info del influencer
  update() {
    this._auth.updateInfluencer(
      this._id,
      // Por temas de asincronicidad, debemos coger los valores ya asignados en el service _auth
      this._auth.data['userName'],
      this._auth.data['userMail'],
      this._auth.data['userInstagram'],
      this._auth.data['userPassword'],
      this._auth.data['userStreet'],
      this._auth.data['userCity'],
      this._auth.data['userZipcode'],
      this._auth.data['userPhone'],
      this._auth.data['userBirthday'],
      // <HTMLInputElement es indicar el tipo sin declarar previamente la variable
      //(<HTMLInputElement>document.getElementById("birthday")).value,
      this._auth.data['userSex'],
      this._auth.data['userFashion'],
      this._auth.data['userFitness'],
      this._auth.data['userFoodie'],
      this._auth.data['userLifestyle'],
      this._auth.data['userBeauty']
    )
  }

  // Borrar un influencer
  delete() {
    if(confirm('¿Quieres confirmar la eliminación de todos tus datos?')) {
      console.log(this.dataIdUser);
      this._auth.deleteInfluencer(this.dataIdUser);
    }
  }

}
