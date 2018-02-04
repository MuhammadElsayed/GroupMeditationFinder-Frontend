import { WebService } from './../services/web.service';
import { Component, OnInit } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbTabsetConfig] // add NgbTabsetConfig to the component providers
})
export class HomeComponent implements OnInit {
  zoom: number = 8;
  lat: number;
  long: number;
  currentGroup;
  constructor(config: NgbTabsetConfig, private webService: WebService) {
    // customize default values of tabsets used by this component tree

  }

  ngOnInit() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
      });
    }

    this.webService.currentLocation.subscribe(location => {
      console.log(location);
      if(typeof location.lat == 'function')
      {   
        this.lat = location.lat();
        this.long = location.lng();
      }
    });
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
    this.currentGroup = this.groups[index];
  }

  joinGroup(i)
  {
    console.log(i);
  }


  
  groups = [
    {
      name:"MUM group",
      description:"MUM student group",
      datetime:"2018-02-08T00:00:00.000Z",
      address:"1000 N 4th street, Fairfield, IA",
      isEveryday:true,
      isJoined:true,
      geolocation:[-91.96654,41.0231219],
      users:["1233445","333333"]
    },
    {
      name:"MUM group",
      description:"MUM student group",
      datetime:"2018-02-08T00:00:00.000Z",
      address:"1000 N 4th street, Fairfield, IA",
      geolocation:["-91.9674354","41.0131219"],
      users:["1233445","333333"]
    },
    {
      name:"MUM group",
      description:"MUM student group",
      datetime:"2018-02-08T00:00:00.000Z",
      address:"1000 N 4th street, Fairfield, IA",
      geolocation:["-91.9674354","41.1231219"],
      users:["1233445","333333"]
    }
  ];


}
