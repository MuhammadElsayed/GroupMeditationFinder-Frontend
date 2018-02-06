import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // @TODO: add geo location in this model
  model: any = {}; // has to be mapped exactly the User model
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.model.admin = 0; // new USER by default
  }

  register() {
    this.loading = true;
    if (this.model.admin === 1) {
      this.model.role = 'admin';
    }
    this.userService.create(this.model)
      .subscribe(
        data => {
          this.toastr.success('Please login', 'Success!');
          this.loading = false;
          this.router.navigate(['login']);
        },
        error => {
          console.log(error);
          this.toastr.error(error, 'Wrong!');
          this.loading = false;
        });
  }

  onUserTypeChange(userType) {
    this.model.admin = userType;
  }

}
