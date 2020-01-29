import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

// Declaramos esta variable para evitar que M genere conflictos de error
// declare var M: any

@Component({
  selector: 'app-info-company',
  templateUrl: './info-company.component.html',
  styleUrls: ['./info-company.component.scss']
})
export class InfoCompanyComponent implements OnInit {

  // variables para rutas dinámicas
  // id para saber de que influencer se trata
  id: number;
  sub: any;
  birthday: string;
  companyPassword: string = "";

  // Podemos utilizar el ID como identificador fijo del user
  dataIdCompany: string = localStorage.getItem("authId");

  // Variables para poder actualizar la info del influencer
  _id: string = this.dataIdCompany;

  constructor(public _api: ApiService, public _auth: AuthService, public _router: ActivatedRoute) { }

  ngOnInit() {
    this._auth.loadDataCompany(this.dataIdCompany);
  }

  // ngAfterViewInit nos sirve para cargar el código cuando se visualice el component
  /*ngAfterViewInit() {
    
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
      onSelect: function(newDate) {
      }
    });
    
  }*/

  update() {
    this._auth.editarEmpresa(
      this._id,
      // Por temas de asincronicidad, debemos coger los valores ya asignados en el service _auth
      this._auth.dataCompany['companyName'],
      this.companyPassword,
      this._auth.dataCompany['companyMail'],
      this._auth.dataCompany['companyInstagram'],
      this._auth.dataCompany['companyStreet'],
      this._auth.dataCompany['companyCity'],
      this._auth.dataCompany['companyZipcode'],
      this._auth.dataCompany['companyPhone'],
      this._auth.dataCompany['companyContact'],
      this._auth.dataCompany['companyFashion'],
      this._auth.dataCompany['companyFitness'],
      this._auth.dataCompany['companyFoodie'],
      this._auth.dataCompany['companyLifestyle'],
      this._auth.dataCompany['companyBeauty'],
      this._auth.dataCompany['companyOther']
    )
  }

  // Borrar una empresa
  delete() {
    if(confirm('¿Quieres confirmar la eliminación de todos tus datos?')) {
      console.log(this.dataIdCompany);
      this._auth.deleteCompany(this.dataIdCompany);
    }
  }

}
