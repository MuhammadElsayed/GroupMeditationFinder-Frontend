import { Component, OnInit, ViewContainerRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private ngZone: NgZone,
    private authenticationService: AuthenticationService,
    private toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.email, this.model.password)
      .subscribe(
        data => {
          this.toastr.success('', 'Welcome!');
          // navigating with reloading the whole APP -classic way-
          this.location.go('home');
          this.reload();
        },
        error => {
          console.log(error);
          this.toastr.error(error, 'Wrong!');
          this.loading = false;
        });
  }
  public reload(): any {
    return this.ngZone.runOutsideAngular(() => {
      location.reload();
    });
  }

}
