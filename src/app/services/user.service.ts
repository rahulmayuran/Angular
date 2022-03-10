import { Injectable } from '@angular/core';

// This import must be manually done to make get(), post() and delete() to work
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpConnect: HttpClient) {
  }

  getUsers() {
    console.log("getting all the users")
    return this.httpConnect.get(environment.userUrl + '/getUsers')
  }

  getUserById(id: number): Observable<any> {
    return this.httpConnect.get(environment.userUrl + '/getUser/' + id);
  }

  getUserByName(name: string): Observable<any> {
    return this.httpConnect.get(environment.userUrl + '/getUsername/' + name);
  }

  saveUser(user: any) {
    return this.httpConnect.post(environment.userUrl + "/register", user);
  }

  deleteUser(id: number) {
    return this.httpConnect.delete(environment.userUrl + '/getUser/' + id);
  }
}

