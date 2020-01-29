import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin-influencer',
  templateUrl: './signin-influencer.component.html',
  styleUrls: ['./signin-influencer.component.scss']
})
export class SigninInfluencerComponent implements OnInit {

  userName: string;
  userMail: string;
  userInstagram: string;
  userPassword: string;

  flagAlertEmptyField: boolean = false;

  constructor(public _api: ApiService, public _auth: AuthService, public _router: ActivatedRoute) { }
  ngOnInit() { }


  registrar() {

    if (this.userName == null || this.userMail == null || this.userInstagram == null || this.userPassword == null) {
      // flagAlert sirve para aparecer un alert y con setTimeout lo borramos
      this.flagAlertEmptyField = true;
      setTimeout(() => { this.flagAlertEmptyField = false }, 5000)
    } else {
      this._auth.registrarNuevoInfluencer(
        this.userName,
        this.userMail,
        this.userInstagram,
        this.userPassword
      )
    }
  }

}
