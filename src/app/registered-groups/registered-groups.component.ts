import { ActivatedRoute } from '@angular/router';
import { WebService } from './../services/web.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registered-groups',
  templateUrl: './registered-groups.component.html',
  styleUrls: ['./registered-groups.component.css']
})
export class RegisteredGroupsComponent implements OnInit {

  groups = [];
  constructor(private webService: WebService, private activatedRoute: ActivatedRoute) {
    
   }

  ngOnInit() {
    this.webService.getRegisteredGroups().subscribe(data => {
      this.groups = <any[]> data;
    });
  }

}
