import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable()
export class UserService {
    url_prefix = 'http://localhost:8080/kuibu-restful';
    constructor(private http: HttpClient) { }

    getAll() {
        console.debug("get all user infor");
        return this.http.get<User[]>('/users');
    }

    getById(id: number) {
        return this.http.get('/users/' + id);
    }

    register(user: User) {
        return this.http.post(this.url_prefix + '/user/register', user);
    }

    update(user: User) {
        return this.http.post('/user/update', user);
    }

    delete(id: number) {
        return this.http.delete('/users/' + id);
    }
}