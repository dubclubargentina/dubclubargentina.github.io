import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopheadingComponent } from './topheading/topheading.component';

//Utsav Modules
import {HttpClientModule} from '@angular/common/http';
import {NewsapiservicesService} from './service/newsapiservices.service';
import { TechnewsComponent } from './technews/technews.component';
import { BusinessnewsComponent } from './businessnews/businessnews.component';
import { EntertainmentnewsComponent } from './entertainmentnews/entertainmentnews.component';
import { SportsnewsComponent } from './sportsnews/sportsnews.component';
import { HealthnewsComponent } from './healthnews/healthnews.component'

@NgModule({
  declarations: [
    AppComponent,
    TopheadingComponent,
    TechnewsComponent,
    BusinessnewsComponent,
    EntertainmentnewsComponent,
    SportsnewsComponent,
    HealthnewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [NewsapiservicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
