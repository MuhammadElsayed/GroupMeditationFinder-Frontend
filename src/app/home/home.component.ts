import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  zoom: number = 8;
  lat: number;
  long: number;
  currentGroup;
  constructor() { }

  ngOnInit() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
      });
    }
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
