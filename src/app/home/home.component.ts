import { ActivatedRoute } from '@angular/router';
import { UserService } from './../services/user.service';
import { WebService } from './../services/web.service';
import { Component, OnInit } from '@angular/core';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { Params } from '@angular/router/src/shared';


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
  groups;
  constructor(config: NgbTabsetConfig, private webService: WebService, 
     private userService: UserService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.lat = params['lat'];
      this.long = params['lng'];
      console.log(params);
    });

    this.webService.currentLocation.subscribe(location => {
      console.log(location);
      this.lat = location.lat;
      this.long = location.lng;
      this.idle();
      // if (typeof location.lat == 'function') {

      // }
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      let userId = params['userId'];
      console.log(userId);
    });
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
    this.currentGroup = this.groups[index];
  }

  joinGroup(i) {
    console.log(i);

    this.webService.joinGroup(this.groups[i]._id).subscribe((data) => {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      this.groups[i].users.push({ name: user.name, joinDate: new Date() });
      console.log(data);
    });
  }

  leaveGroup(i) {
    console.log(i);
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.webService.leaveGroup(this.groups[i]._id).subscribe((data) => {
      this.groups[i].users = this.groups[i].users.filter(u => u.name != user.name);
      console.log(data);
    });
  }

  checkGroupJoinStatus(i) {
    if (Array.isArray(this.groups[i].users)) {
      // console.log(this.groups[i]);
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (this.groups[i].users.some(u => u.name === user.name)) {
        return true;
      }
    }
    return false;
    // group[i].users
  }

  idle() {
    console.log(this.lat);
    this.webService.getNearbyGroups(this.long, this.lat).subscribe((data) => {
      this.groups = data;
      console.log(data);
    }, (err) => {
      console.log(err);
    });
  }

  isAuthenticated() {
    return this.userService.isAuthenticated();
  }



  // groups = [
  //   {
  //     name:"MUM group",
  //     description:"MUM student group",
  //     datetime:"2018-02-08T00:00:00.000Z",
  //     address:"1000 N 4th street, Fairfield, IA",
  //     isEveryday:true,
  //     isJoined:true,
  //     geolocation:[-91.96654,41.0231219],
  //     users:["1233445","333333"]
  //   },
  //   {
  //     name:"MUM group",
  //     description:"MUM student group",
  //     datetime:"2018-02-08T00:00:00.000Z",
  //     address:"1000 N 4th street, Fairfield, IA",
  //     geolocation:["-91.9674354","41.0131219"],
  //     users:["1233445","333333"]
  //   },
  //   {
  //     name:"MUM group",
  //     description:"MUM student group",
  //     datetime:"2018-02-08T00:00:00.000Z",
  //     address:"1000 N 4th street, Fairfield, IA",
  //     geolocation:["-91.9674354","41.1231219"],
  //     users:["1233445","333333"]
  //   }
  // ];


}
