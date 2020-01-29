import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-company',
  templateUrl: './login-company.component.html',
  styleUrls: ['./login-company.component.scss']
})
export class LoginCompanyComponent implements OnInit {

  constructor(public _api: ApiService, public _auth: AuthService, public _router: ActivatedRoute) { }
  ngOnInit() { }

  companyMail: string;
  companyPassword: string;

  flagAlertEmptyField: boolean = false;

  login() {
    if (this.companyMail == null || this.companyPassword == null) {
      // flagAlert sirve para aparecer un alert y con setTimeout lo borramos
      this.flagAlertEmptyField = true;
      setTimeout(() => { this.flagAlertEmptyField = false }, 5000)
    } else {
      this._auth.loginCompany(this.companyMail, this.companyPassword)
    }
  }
}
