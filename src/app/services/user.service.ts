import { Observable } from "rxjs/Rx";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class UserService {
  private baseUrl:string = environment.apiUrl;
  userNames : object;

  constructor(private http: HttpClient) { }


  register(user: any) {
    console.log("inside user service" , user);
    return this.http.post<any>(`${this.baseUrl}/user/register`, user);        
  }

  getAllUsers(){
  	console.log("inside getAllUsers");
    return this.http.get<any>(`${this.baseUrl}/user/getAllUsers`)
  }  
   
  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user != null ? true : false;
  }
  getChatRoomsChat(chatRoom) {
    return this.http.get<any>(`${this.baseUrl}/chatroom/` + chatRoom);
  }
}

