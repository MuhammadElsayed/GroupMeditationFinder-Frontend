import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from '../app.config';
import { User } from '../models/user';
import { AdminKey } from '../models/adminKey';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    private currentUser: User;

    getCurrentUser(): User {
      if (!this.currentUser) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      }
      return this.currentUser;
    }

    isAuthenticated(): boolean {
      if (!this.getCurrentUser()) {
        return false;
      } else {
        return true;
      }
    }

    isAdmin(): boolean {
      return (this.getCurrentUser() && this.getCurrentUser().role === 'admin');
    }

    // ------------------------------ WEB SERVICES --------------------------------
    getAll() {
    }

    getById(_id: string) {
    }

    getFromToken() {
      return this.http.get(AppConfig.apiUrl + '/users/user');
    }

    create(user: User) {
        return this.http.post(AppConfig.apiUrl + '/users/register', user);
    }

    update(user: User) {
        return this.http.put(AppConfig.apiUrl + '/users/' + user._id, user);
    }

    delete(_id: string) {
    }

    addKey(adminKey: AdminKey) {
      return this.http.post(AppConfig.apiUrl + '/users/addkey', adminKey);
    }
}
