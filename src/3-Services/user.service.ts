import { Injectable } from '@angular/core';

// This import must be manually done to make get(), post() and delete() to work
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //userUrl:string = "http://localhost:3000/";
  //  userUrl:string = "http://localhost:9052/api/v1.0/user";
  userUrl:string = "http://ec2-3-22-99-145.us-east-2.compute.amazonaws.com:9051/user/api/v1.0/user";
  public user:any = [];

  serviceuname:any ;

  constructor(private httpConnect:HttpClient) { 
    this.user={id:0, name:'', password:'', role:''}
  }

    getUsers()
    { 
      console.log("getting all the users")
       return this.httpConnect.get(this.userUrl+'/getUsers')
    }

    getUserById(id:number){
      console.log("getting user with id "+id);
      return this.httpConnect.get(this.userUrl+'/'+id);
    }
    
    getUserByName(name:string){
      console.log("getting user with name from service "+ name);
      return this.httpConnect.get(this.userUrl+'/'+name);
    }


    // While saving user, subscription is done, don't need to return. 
    saveUser(user:any)
    {
      console.log("Saved the user from service ->"+user);
      this.httpConnect.post(this.userUrl+"/register", user).subscribe(data => {
        console.log(data);
      });
    }
    
    deleteUser(id:number){
      console.log("Deleted the user with id "+id);
      return this.httpConnect.delete(this.userUrl+'/'+id);
    }
  }

