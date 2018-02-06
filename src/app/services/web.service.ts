import { UserService } from './user.service';
import { AppConfig } from './../app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from './authentication.service';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class WebService {
  currentLocation: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }
  getNearbyGroups(lng, lat) {
    let params = new HttpParams();
    params = params.append('lng', lng);
    params = params.append('lat', lat);
    return this.http.get(AppConfig.apiUrl + '/groups/nearby', { params: params });
    
    // .map((data) => {
    //   console.log(data);
    //   for(let group of data)
    //   {
    //     if (group.users.some((user) => user.name == this.authenticationService.currentUser.name)) {
    //       Object.assign(group, {isJoined: true});
    //       console.log('this user in this group');
    //     }
    //   }
    //   return data;
    // });
  }

  joinGroup(id) {
    return this.http.post(AppConfig.apiUrl + '/groups/join', {id: id});
  }

  leaveGroup(id) {
    return this.http.post(AppConfig.apiUrl + '/groups/leave', {id: id});
  }
  getRegisteredGroups() {
    return this.http.get(AppConfig.apiUrl + '/groups/registered');
  }

  placeChanged(coords) {
    this.currentLocation.next(coords);
  }
}
