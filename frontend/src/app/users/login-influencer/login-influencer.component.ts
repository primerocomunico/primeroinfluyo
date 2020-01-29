import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-influencer',
  templateUrl: './login-influencer.component.html',
  styleUrls: ['./login-influencer.component.scss']
})
export class LoginInfluencerComponent implements OnInit {

  userInstagram: string;
  userPassword: string;

  flagAlertEmptyField: boolean = false;

  constructor(public _api: ApiService, public _auth: AuthService, public _router: ActivatedRoute) { }
  ngOnInit() { }

  login() {
    if (this.userPassword == null || this.userInstagram == null) {
      // flagAlert sirve para aparecer un alert y con setTimeout lo borramos
      this.flagAlertEmptyField = true;
      setTimeout(() => { this.flagAlertEmptyField = false }, 5000)
    } else {
      this._auth.loginInfluencer(this.userInstagram, this.userPassword)
    }
  }
}
