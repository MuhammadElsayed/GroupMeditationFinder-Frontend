import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
@Injectable()
export class WebService {
  currentLocation: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor() { }
  getNearbyGroupsByCurrentCoords(coords){
  }

  getNearbyGroupsByUser(){
  }

  getGroupById(id) {
  }

  placeChanged(coords) {
    this.currentLocation.next(coords);
  }
}
