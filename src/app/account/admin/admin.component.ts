import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
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
  }

  addKey() {
    this.userService.addKey(this.model)
      .subscribe(
        data => {
          this.toastr.success('The key has been added to our system', 'Success!');
          this.model.key = '';
          this.loading = false;
        },
        error => {
          console.log(error);
          this.toastr.error(error, 'Wrong!');
          this.loading = false;
        });
  }

}
