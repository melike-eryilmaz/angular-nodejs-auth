import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventsUrl = "http://localhost:3000/api/events";
  specialeventsUrl = "http://localhost:3000/api/special";
  constructor(private http : HttpClient) { }

  getEvents(){
    return this.http.get<any>(this.eventsUrl)
  }

  getSpecialEvents(){
    return this.http.get<any>(this.specialeventsUrl)
  }
}
