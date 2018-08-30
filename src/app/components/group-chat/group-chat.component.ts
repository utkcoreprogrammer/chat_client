import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';
import * as io from 'socket.io-client';



@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit {
	private username : String
  private email : String
  private chatroom;
  private message: String;
  private messageArray: Array <{user: String, message: String}> = [];
  private messageData : any =[];
  private chatHistory : any = [];
  private isTyping = false;
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private chatService: ChatService,
    private router: Router) { 
    this.username = this.route.snapshot.queryParamMap.get('name');
    this.email = this.route.snapshot.queryParamMap.get('email');  
    const currentUser = this.userService.getLoggedInUser();
    if (currentUser.username < this.username) {
      this.chatroom = currentUser.username.concat(this.username);
    } else {
      this.chatroom = this.username.concat(currentUser.username);

    }
    this.chatService.joinRoom({user: this.userService.getLoggedInUser().username, room: this.chatroom}); 

    this.chatService.getChatHistory().subscribe(messages => {
        let keys = Object.keys(messages);
        console.log("keys$$$$$$$$$$",keys);
        // this.chatHistory.push(messages);

        for(var key of keys){
          this.chatHistory.push(messages[key]);
        }     
         console.log("messagess$$$$$$$$$$",messages);

      this.chatService.receivedTyping().subscribe(bool => {
      this.isTyping = bool.isTyping;
      
    });

    this.chatService.newMessageReceived().subscribe(data => {
        console.log("data received", data);
        this.chatHistory.push(data);
        this.isTyping = false;
        console.log("message data updated", this.messageData);
        });
        console.log("chat history" , this.chatHistory);
        console.log("chat history" , this.messageData);
        console.log("messages" , messages);
  
  
        
      });
  }

   ngOnInit() {


  }
   sendMessage() {
    this.chatService.sendMessage({room: this.chatroom, user: this.userService.getLoggedInUser().username, message: this.message});
    this.message = '';
    // this.isTyping = false;
  }
    typing() {
    this.chatService.typing({room: this.chatroom, user: this.userService.getLoggedInUser().username});
  }

}
