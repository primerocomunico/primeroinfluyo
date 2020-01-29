import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './static/home/home.component';
import { MarketingComponent } from './static/marketing/marketing.component';
import { InfluencerComponent } from './static/influencer/influencer.component';
import { SigninInfluencerComponent } from './users/signin-influencer/signin-influencer.component';
import { InfoInfluencerComponent } from './users/info-influencer/info-influencer.component';
import { SigninCompanyComponent } from './users/signin-company/signin-company.component';
import { InfoCompanyComponent } from './users/info-company/info-company.component';
import { CampaignGeneratorComponent } from './marketing/campaign-generator/campaign-generator.component';
import { OfferGeneratorComponent } from './marketing/offer-generator/offer-generator.component';
import { AllcampaignsComponent } from './marketing/allcampaigns/allcampaigns.component';
import { DetailCampaignComponent } from './marketing/detail-campaign/detail-campaign.component';

// Services
import {ApiService} from './services/api.service';
import {AuthService} from './services/auth.service';
import {DataService} from './services/data.service';
import {AuthGuard} from './guards/auth.guard';

// Routing
import { Routes, RouterModule } from '@angular/router';
import { EditCampaignComponent } from './marketing/edit-campaign/edit-campaign.component';
import { EditOfferComponent } from './marketing/edit-offer/edit-offer.component';
import { LoginInfluencerComponent } from './users/login-influencer/login-influencer.component';
import { LoginCompanyComponent } from './users/login-company/login-company.component';
// Rutas URL
const misRutas: Routes = [
  { 'path': 'home', 'component': HomeComponent},
  { 'path': 'marketing', 'component': MarketingComponent},
  { 'path': 'influencer', 'component': InfluencerComponent},
  { 'path': 'newinfluencer', 'component': SigninInfluencerComponent},
  { 'path': 'loginfluencer', 'component': LoginInfluencerComponent},
  { 'path': 'editinfluencer', 'component': InfoInfluencerComponent, 'canActivate': [AuthGuard]},
  { 'path': 'newcompany', 'component': SigninCompanyComponent},
  { 'path': 'logincompany', 'component': LoginCompanyComponent},
  { 'path': 'editcompany', 'component': InfoCompanyComponent, 'canActivate': [AuthGuard]},
  { 'path': 'campaign', 'component': CampaignGeneratorComponent, 'canActivate': [AuthGuard]},
  { 'path': 'editcampaign/:id', 'component': EditCampaignComponent, 'canActivate': [AuthGuard]},
  { 'path': 'offer', 'component': OfferGeneratorComponent, 'canActivate': [AuthGuard]},
  { 'path': 'bienvenido', 'component': AllcampaignsComponent, 'canActivate': [AuthGuard]},
  { 'path': 'campaign/:id', 'component': DetailCampaignComponent, 'canActivate': [AuthGuard]},
  //{ 'path': 'products', 'component': HomeComponent, 'canActivate': [AuthguardGuard]},
  { 'path': ' ', 'component': HomeComponent },
  { 'path': '**', 'component': HomeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MarketingComponent,
    InfluencerComponent,
    SigninInfluencerComponent,
    InfoInfluencerComponent,
    SigninCompanyComponent,
    InfoCompanyComponent,
    CampaignGeneratorComponent,
    OfferGeneratorComponent,
    AllcampaignsComponent,
    DetailCampaignComponent,
    EditCampaignComponent,
    EditOfferComponent,
    LoginInfluencerComponent,
    LoginCompanyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(misRutas)
  ],
  providers: [ApiService, AuthService, DataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
