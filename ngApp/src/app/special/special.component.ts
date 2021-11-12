import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {

  specialEvents = [];
  constructor(private eventService :EventService,private router : Router) { }

  ngOnInit(): void {
    this.eventService.getSpecialEvents().subscribe(
      res =>this.specialEvents=res,
      err=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['/login'])
          }
        }
      }
      
    )
  }

}
