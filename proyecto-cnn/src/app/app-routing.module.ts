import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopheadingComponent } from './topheading/topheading.component';
import { TechnewsComponent } from './technews/technews.component';
import { BusinessnewsComponent } from './businessnews/businessnews.component';
import { EntertainmentnewsComponent} from './entertainmentnews/entertainmentnews.component';
import { SportsnewsComponent} from './sportsnews/sportsnews.component';
import { HealthnewsComponent} from './healthnews/healthnews.component';

const routes: Routes = [
  
  {path:'',component:TopheadingComponent},//Home

  {path:'tech',component:TechnewsComponent},//tech news
  {path:'business',component:BusinessnewsComponent},//business news
  {path:'entertainment',component:EntertainmentnewsComponent},//entertainment news
  {path:'sports',component:SportsnewsComponent},//sports news
  {path:'health',component:HealthnewsComponent},//health news
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
