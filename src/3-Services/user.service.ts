import { Injectable } from '@angular/core';

// This import must be manually done to make get(), post() and delete() to work
import {HttpClient} from '@angular/common/http';
import { User } from 'src/5-Entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl:string = "http://localhost:3000/";
  public user:any = [];

  constructor(private httpConnect:HttpClient) { 
    this.user={id:0, userId:'', name:'', password:'', role:''}
  }

    getUsers()
    { 
      console.log("getting all the users")
       return this.httpConnect.get(this.userUrl)
    }

    getUserById(id:number){
      console.log("getting user with id "+id);
      return this.httpConnect.get(this.userUrl+'/'+id);
    }
    
    getUserByName(name:string){
      console.log("getting user with name "+ name);
      return this.httpConnect.get<User[]>(this.userUrl+'users?name'+name);
    }


    // While saving user, subscription is done, don't need to return. 
    saveUser(user:any)
    {
      console.log("Saved the user ->"+user);
      this.httpConnect.post(this.userUrl+"users", user).subscribe(data => {
        console.log(data);
      });
    }
    
    deleteUser(id:number){
      console.log("Deleted the user with id "+id);
      return this.httpConnect.delete(this.userUrl+'/'+id);
    }
  }

