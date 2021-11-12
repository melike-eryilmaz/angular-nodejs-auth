import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {

  specialEvents = [];
  constructor(private eventService :EventService) { }

  ngOnInit(): void {
    this.eventService.getSpecialEvents().subscribe(
      res =>this.specialEvents=res,
      err=>console.log(err)
      
    )
  }

}
