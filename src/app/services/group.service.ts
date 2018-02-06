import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from './../app.config';

let url = AppConfig.apiUrl + '/groups/'

@Injectable()
export class GroupService {

  constructor(private http: HttpClient){}

  getList(page){
    let u = url + "?page="+page;
    console.dir(u)
    return this.http.get(u) 
  }

  getOne(id){
    let u = url + id;
    console.dir(u)
    return this.http.get(u) 
  }

  post(data){
    let u = url
    console.dir(u)
    return this.http.post(url, data) 
  }

  put(id, data){
    let u = url +  id;
    console.dir(u)
    return this.http.put(u, data) 
  }

  delete(id){
    let u = url +  id;
    console.dir(u)
    return this.http.delete(u, {}) 
  }
}
