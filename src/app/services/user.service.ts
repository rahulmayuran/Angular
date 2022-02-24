import { Injectable } from '@angular/core';

// This import must be manually done to make get(), post() and delete() to work
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //userUrl:string = "http://localhost:3000/";
  userUrl: string = "http://localhost:9052/api/v1.0/user";
  //userUrl:string = "http://ec2-3-22-99-145.us-east-2.compute.amazonaws.com:9051/user/api/v1.0/user";
  //userUrl:string = "http://localhost:9052/user/api/v1.0/user";
  serviceuname: any;

  constructor(private httpConnect: HttpClient) {
  }

  getUsers() {
    console.log("getting all the users")
    return this.httpConnect.get(this.userUrl + '/getUsers')
  }

  getUserById(id: number): Observable<any> {
    return this.httpConnect.get(this.userUrl + '/getUser/' + id);
  }

  getUserByName(name: string): Observable<any> {
    return this.httpConnect.get(this.userUrl + '/getUsername/' + name);
  }

  saveUser(user: any) {
    return this.httpConnect.post(this.userUrl + "/register", user);
  }

  deleteUser(id: number) {
    return this.httpConnect.delete(this.userUrl + '/getUser/' + id);
  }
}

