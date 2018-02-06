import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

// https://github.com/ng2-ui/datetime-picker
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})

@Injectable()
export class GroupComponent implements OnInit {
  myForm: FormGroup;

  groupList = [];
  closeResult: string;

  page = 1;
  collectionSize = 0;

  date: Date = new Date() //| date:'yyyy-MM-dd HH:mm:ss' ;


  constructor(private router: Router, private formBuilder: FormBuilder,
     private modalService: NgbModal, private groupService: GroupService) {
    this.myForm = formBuilder.group({
      '_id': ['', []],
      'name': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'datetime': [new Date(), [Validators.required]],
      'geolocation': ['', [Validators.required]],
      'isEveryday': [false, []],
      'users': [[], []],
      'createDate': ['', []],
      'updateDate': ['', []],

      'address': formBuilder.group({
        'street': ['', [Validators.required]],
        'city': ['', [Validators.required]],
        'state': ['IA', [Validators.required]],
      }),
    });

  }

  ngOnInit() {
    this.loadDate(1)
    this.initGeolocation();
  }

  loadDate(page) {
    this.groupService.getList(page).subscribe(
      data => {
        console.dir(data)
        this.groupList = data['data']
        this.collectionSize = data['total']
      });
  }

  initGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.dir(position.coords)
        this.myForm.controls['geolocation'].setValue([position.coords.longitude, position.coords.latitude]);
        console.log(position.coords);
      });
    }
  }

  modalReference: NgbModalRef;
  onCreate(content) {
    this.myForm.reset();
    this.initGeolocation();
    this.openModal(content);
  }

  openModal(content) {
    this.modalReference = this.modalService.open(content)
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //https://github.com/ng-bootstrap/ng-bootstrap/issues/800
  onPageChange(event) {
    console.log(this.page);
    this.loadDate(this.page);
  }

  onSubmit() {
    console.dir(this.myForm.value);

    let id = this.myForm.value._id;
    if (!id) { //create
      this.groupService.post(this.myForm.value).subscribe(
        data => {
          console.dir(data)
          if (data['error_code'] == 0) {
            this.modalReference.dismiss();
            this.groupService.getOne(data['_id']).subscribe(
              g => {
                console.dir(g[0])
                this.addElement(g[0])
              });
          }
        });
    } else { //update 
      this.groupService.put(id, this.myForm.value).subscribe(
        data => {
          console.dir(data)
          if (data['error_code'] == 0) {
            this.modalReference.dismiss();
            this.groupService.getOne(data['_id']).subscribe(
              g => {
                console.dir(g[0])
                this.updateElement(data['_id'], g[0])
              });
          }
        });
    }

  }


  parseGeolocation(target) {
    var res = target.value.split(",");
    let isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
    console.dir(isNumeric.test(res[0]))
    console.dir(isNumeric.test(res[1]))
    if (res.length == 2 && isNumeric.test(res[0]) && isNumeric.test(res[1])) {
      this.myForm.controls['geolocation'].setValue(res);
    } else {
      this.myForm.controls['geolocation'].setErrors({ 'format': 'Format is illegal! Number,Number is required!' })
      console.dir(this.myForm.controls['geolocation'].errors)
    }
  }


  onUpdate(id, content) {
    console.dir(id)
    this.groupService.getOne(id).subscribe(
      data => {
        console.dir(data[0])
        this.myForm.setValue(data[0])
        this.openModal(content);
      });
  }

  onDelete(id) {
    console.dir(id);
    if (confirm("Are you sure to delete?")) {
      this.groupService.delete(id).subscribe(
        data => {
          console.dir(data[0]);
          if (data['error_code'] == 0) {
            this.deleteElement(id)
          }
        });
    }
  }


  addElement(g) {
    this.groupList.unshift(g);
  }

  deleteElement(id) {
    for (let i in this.groupList) {
      if (this.groupList[i]._id == id) {
        //this.groupList.splice(i, 1);
        break;
      }
    }
  }

  updateElement(id, g) {
    for (let i in this.groupList) {
      if (this.groupList[i]._id == id) {
        this.groupList[i] = g
        break;
      }
    }
  }
}
