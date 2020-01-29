import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin-company',
  templateUrl: './signin-company.component.html',
  styleUrls: ['./signin-company.component.scss']
})
export class SigninCompanyComponent implements OnInit {

  companyName: string;
  companyPassword: string;
  companyMail: string;
  companyInstagram: string;
  companyStreet: string;
  companyCity: string;
  companyZipcode: string;
  companyPhone: number;
  companyContact: string;
  companyFashion: boolean = false;
  companyFitness: boolean = false;
  companyFoodie: boolean = false;
  companyLifestyle: boolean = false;
  companyBeauty: boolean = false;
  companyOther: boolean = false;

  flagAlertEmptyField: boolean = false;

  constructor(public _api: ApiService, public _auth: AuthService, public _router: ActivatedRoute) { }
  ngOnInit() { }

  registrar() {

    if (
      this.companyName == null ||
      this.companyPassword == null ||
      this.companyMail == null ||
      this.companyStreet == null ||
      this.companyCity == null ||
      this.companyZipcode == null ||
      this.companyPhone == null ||
      this.companyContact == null
    ) {
      // flagAlert sirve para aparecer un alert y con setTimeout lo borramos
      this.flagAlertEmptyField = true;
      setTimeout(() => { this.flagAlertEmptyField = false }, 5000)
    } else {
      this._auth.registrarNuevaEmpresa(
        this.companyName,
        this.companyPassword,
        this.companyMail,
        this.companyInstagram,
        this.companyStreet,
        this.companyCity,
        this.companyZipcode,
        this.companyPhone,
        this.companyContact,
        this.companyFashion,
        this.companyFitness,
        this.companyFoodie,
        this.companyLifestyle,
        this.companyBeauty,
        this.companyOther
      )
    }
  }
}
