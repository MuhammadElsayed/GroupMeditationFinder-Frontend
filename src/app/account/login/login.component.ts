import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
          this.toastr.success('', 'Success!');
          this.router.navigate(['home']);
        },
        error => {
          console.log(error.error);
          let msg: string;
          if (error.error.errors) {
            if (error.error.errors.email) {
              msg = error.error.errors.email.msg;
            } else {
              msg = error.error.errors.password.msg;
            }
          } else {
            msg = error.error;
          }
          this.toastr.error(msg, 'Wrong!');
          this.loading = false;
        });
  }

}
