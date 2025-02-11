import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NewsapiservicesService {

  constructor(private _http:HttpClient) { }

  newsApiUrl = "https://newsapi.org/v2/top-headlines?country=in&apiKey=0c1f2524ce8b4e239605f02f4f6991ed";
  techApiUrl = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=0c1f2524ce8b4e239605f02f4f6991ed";
  businessApiUrl = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=0c1f2524ce8b4e239605f02f4f6991ed";
  entertainmentApiUrl = "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=0c1f2524ce8b4e239605f02f4f6991ed";
  sportsApiUrl = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=0c1f2524ce8b4e239605f02f4f6991ed";
  healthApiUrl = "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=0c1f2524ce8b4e239605f02f4f6991ed";

  
  topHeading():Observable<any>
  {
    return this._http.get(this.newsApiUrl);
  }

  techNews():Observable<any>
  {
    return this._http.get(this.techApiUrl);
  }

  businessNews():Observable<any>
  {
    return this._http.get(this.businessApiUrl);
  }

  entertainmentNews():Observable<any>
  {
    return this._http.get(this.entertainmentApiUrl);
  }

  sportsNews():Observable<any>
  {
    return this._http.get(this.sportsApiUrl);
  }

  healthNews():Observable<any>
  {
    return this._http.get(this.healthApiUrl);
  }

}
