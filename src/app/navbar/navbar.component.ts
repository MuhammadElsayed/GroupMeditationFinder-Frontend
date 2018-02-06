import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { WebService } from '../services/web.service';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchControl: FormControl;
  accountHeader: string;
  hasLoggedinUser: boolean;
  isAdmin: boolean;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private location: Location,
    private webService: WebService,
    private userService: UserService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.searchControl = new FormControl();
    if (this.userService.isAuthenticated()) {
      this.hasLoggedinUser = true;
      this.isAdmin = this.userService.isAdmin();
      this.accountHeader = this.userService.getCurrentUser().name;
    } else {
      this.hasLoggedinUser = false;
      this.isAdmin = false;
      this.accountHeader = 'Account';
    }
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);

        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.webService.placeChanged(coords);
      });
    }

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["(cities)"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          const coords = {
            lng: place.geometry.location.lng(),
            lat: place.geometry.location.lat()
          };

          this.webService.placeChanged(coords);
          console.log(place.geometry.location.lat());

          //set latitude, longitude and zoom
          // this.latitude = place.geometry.location.lat();
          // this.longitude = place.geometry.location.lng();
          // this.zoom = 12;
        });
      });
    });
  }

  logOut(): void {
    this.authService.logout();
    // reload the user with the hard way (old school)
    this.location.go('login');
    this.reload();
  }
  public reload(): any {
    return this.ngZone.runOutsideAngular(() => {
      location.reload();
    });
  }

}
