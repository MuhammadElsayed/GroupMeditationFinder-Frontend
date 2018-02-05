import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { User } from '../models/user';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
    }

    getById(_id: string) {
    }

    getFromToken() {
      return this.http.get(appConfig.apiUrl + '/users/user');
    }

    create(user: User) {
        return this.http.post(appConfig.apiUrl + '/users/register', user);
    }

    update(user: User) {
        return this.http.put(appConfig.apiUrl + '/users/' + user._id, user);
    }

    delete(_id: string) {
    }
}
