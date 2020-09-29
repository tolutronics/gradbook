import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthProvider } from 'src/providers/auth-provider';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.page.html',
  styleUrls: ['./chatpage.page.scss'],
})
export class ChatpagePage implements OnInit {
  mate=null;
  no=null;
  user_id:any
  chat_text:any="";
  msgs=[] as any;
  // msgs =[
  //   {name:"Emma",  text:"Hello bro", time:"2:45pm" }, 
  //   {name:"Tolu",  text:"Hello bro", time:"2:45pm" },
  //   {name:"Emma",  text:"Whatsup with you", time:"2:45pm" },
  //   {name:"Tolu",  text:"      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, quidem suscipit eum repellendus excepturi accusantium odio nulla fugiat. Laborum facere similique praesentium aliquid non delectus soluta dolorum asperiores tempora aspernatur!", time:"2:45pm" },
  //   {name:"Emma",  text:"i'am fine too",time:"2:45pm" },
  //   {name:"Tolu",  text:"Where are you now", time:"2:45pm" },
  //   {name:"Emma",  text:"i am in Lagos", time:"2:45pm" },
  
  // ]
  user:any;
  constructor(public dbase: AngularFireDatabase,public db: AngularFirestore, private arouter:ActivatedRoute, private router:Router,private authApi:AuthProvider,private auth:AuthService) { }

  ngOnInit() {
   
    this.no = 1;
    this.user=this.auth.currentUser();
    this.user_id= this.user.user_id
    this.arouter.queryParams.subscribe((res)=>{
      console.log(res);
      this.mate=res;
   });

   this.getchat();
  
  }

  back(){
    console.log('tolux')
    this.router.navigate(['/tabs/tab4'])
  }

  send(){
    var chars = "0123456789a?><|{}_+bcdefghiklmnopqrstuvwxyz";
    var string_length = 10;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
    }
   
    

    if(this.chat_text !== ""){

      

      this.db.collection('chats').add({
        message: this.chat_text,
        handshake:this.user.user_id+this.mate.user_id,
        sender_id:this.user.user_id,
        user_id:this.user.user_id,
        mate_id:this.mate.user_id,
        time:Date()
      }).then((data)=>{

        this.db.collection('chats').add({
          message: this.chat_text,
          handshake:this.mate.user_id+this.user.user_id,
          sender_id:this.user.user_id,
          user_id:this.user.user_id,
          mate_id:this.mate.user_id,
          time:Date()
        })
        this.chat_text=""
      })



      // this.db.collection('chats').add({
      //   message: this.chat_text,
      //   handshake:this.mate.user_id+this.user.user_id,
      //   sender_id:this.user.user_id,
      //   user_id:this.user.user_id,
      //   mate_id:this.mate.user_id,
      //   time:Date()
      // })


      // let body={
      //   user_id: this.user.user_id,
      //   chat_id:randomstring,
      //   chat_text:this.chat_text,
      //   chat_date:Date(),
      //   mate_id:this.mate.user_id,
      //   aksi:"postchat"
      //   }
       
      //     this.authApi.postData(body, 'chat.php').subscribe(async data =>{
      //         console.log(data['success']);
      //         console.log(data['msg']);


      //         if(data['success']==true){
      //           console.log(this.msgs)
      //           this.chat_text=""
      //           this.getchat()
                
      //         }
      //     })
    }
  }

  getchat(){
    this.msgs=[]
    const handshake = this.user.user_id+this.mate.user_id
    console.log(handshake)
   this.db.collection('/chats', ref=>ref.where("handshake","==",handshake).orderBy("time" )).valueChanges().subscribe((data)=>{
      console.log(data)
      this.msgs=data
data.forEach(element => {
  element['time'] = moment(element['time']).format('hh:mm a');
 // this.msgs.push(element)
});

      
    })
      //   let body={
      // user_id: this.user.user_id,
      // mate_id:this.mate.user_id,
      // aksi:"getchat"
      // }
     
        // this.authApi.postData(body, 'chat.php').subscribe(async data =>{
        //   if (data !== null)
        //     {
        //         data['result'].forEach(element => {
        //         element['chat_date'] = moment(element['chat_date']).format('hh:mm a');
        //         this.msgs.push(element)
        //       });
        //       console.log(this.msgs)
        //     }
        // })
  

   }

  }