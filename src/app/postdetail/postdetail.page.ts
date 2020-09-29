import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthProvider } from 'src/providers/auth-provider';
import { AuthService } from '../auth.service';
import { IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.page.html',
  styleUrls: ['./postdetail.page.scss'],
})
export class PostdetailPage implements OnInit {
  @ViewChild('refresher',{static:false}) refresher: IonRefresher;
  myreply:any="";
view=null;
count:any;
views=null
post_like:any
no=null;
user:any;
myparent_id:any
comments=[] as any;
  constructor( private authApi:AuthProvider,private auth:AuthService, private getroute:ActivatedRoute, private router:Router) { }
  
  
  ionViewWillEnter(){
   
   // this.doRefresh(this.refresher);
    
  //   this.getroute.queryParams.subscribe((res)=>{
  //     console.log(res);
  //     this.views=res;
  // });
    
  }
  ngOnInit() {
   // this.doRefresh(this.refresher);
this.no = 1;
this.user=this.auth.currentUser();
//console.log(this.user)
    this.getroute.queryParams.subscribe((res)=>{
      console.log(res);
      this.view=res;
      this.getComment(this.view['post_id']);
     this.count=this.view['comment_count']
     this.post_like=this.view['post_like']
     this.myparent_id = this.view['post_id']

 
  });
  
  
  }

  doRefresh(event:any,i:any){
    if(i=="all"){
      this.getComment(this.view['post_id'])
      let body={
     
        post_id:this.view['post_id'],
        parent_id:this.view['parent_id'],
        aksi:"get_singlepost"
        }
      this.authApi.postData(body, 'auth.php').subscribe(async data =>{
  
        if(data['success']==true){
          console.log(data['result'])
          data['result'].forEach(element => {
            console.log(element)
            this.views=element
          });
         console.log(this.views['poster_img'])
         this.count= this.views['comment_count']
         this.post_like= this.views['post_like']
        }
  
    
      })
    }
    if (i=="comment" ){
      this.getComment(this.view['post_id'])
      let body={
     
        post_id:this.view['post_id'],
        parent_id:this.view['parent_id'],
        aksi:"get_singlepost"
        }
      this.authApi.postData(body, 'auth.php').subscribe(async data =>{
  
        if(data['success']==true){
          console.log(data['result'])
          data['result'].forEach(element => {
            console.log(element)
            this.views=element
          });
         console.log(this.views['poster_img'])
         this.count= this.views['comment_count']
        }
  
    
      })

    }

    else if(i=='commentlike'){
      this.getComment(this.view['post_id'])
    }
    
    else if (i=="postlike") {
let dumview=[]as any
      let body={
     
        post_id:this.view['post_id'],
        parent_id:this.view['parent_id'],
        aksi:"get_singlepost"
        }
      this.authApi.postData(body, 'auth.php').subscribe(async data =>{
  
        if(data['success']==true){
          console.log(data['result'])
          data['result'].forEach(element => {
            console.log(element)
            dumview=element
          });
         console.log(dumview['poster_img'])
         this.post_like= dumview['post_like']
        }
  
    
      })

    
    }
    
   
  
  console.log(this.count)
event.complete()
  }
  like(post_id:any,parent_id:any,section:any){
    console.log('my id '+post_id)
    console.log('my sectopn '+section)
    console.log('parent id '+ parent_id)
    let body={
     post_liker_id:this.user.user_id,
      post_id:post_id,
      post_like_date:Date(),
      parent_id:parent_id,
      aksi:"addlike"
      }
  this.authApi.postData(body, 'auth.php').subscribe(async data =>{
    console.log(data['success'])
     console.log(data['result'])
     if(data['success']==true){

      switch (section) {
        case 'comment':
          this.doRefresh(this.refresher,'commentlike')
          break;
      
        case 'post':
        this.doRefresh(this.refresher,'postlike')
          break;
      }
      
    }
  })

  }


  getComment(i:any){
    this.comments=[]
    let body={
     
      post_id:i,
      aksi:"getcomment"
      }
     
        this.authApi.postData(body, 'auth.php').subscribe(async data =>{
        //  console.log(data['msg'])
        //  console.log(data['success'])
         if (data['success']==true) {
          data['result'].forEach(element => {
            
            this.comments.push(element)
          });
          console.log('my comments',this.comments)
          console.log('my post_like',this.comments['post_like'])

         }else{
           this.comments=[];
         }
         

        })
        // console.log(this.comments)
  }

  sendReply(){
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 7;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length+2);
    randomstring += chars.substring(rnum,rnum+1);
    }
    if(this.myreply !== ""){
      let body={
        user_id: this.user.user_id,
        post_id:this.view['post_id'],
        comment_id:randomstring,
        parent_id:this.view['parent_id'],
        comment:this.myreply,
        commenter_img:this.user.image,
        commenter_name:this.user.username,
        comment_date:Date(),
        aksi:"postcomment"
        }
       
          this.authApi.postData(body, 'auth.php').subscribe(async data =>{
              console.log(data['success']);
              console.log(data['msg']);


              if(data['success']==true){
                this.myreply=""
                this.doRefresh(this.refresher,'comment');
              }
          })
    }

  }

  postback(){
    this.router.navigate(['tabs/tab1'])
  }
  postdetail(poster_img:any, poster_name:any,post:any,post_img:any,post_id:any,comment_count:any,post_like:any){
    const data= {
      parent_id: this.view['post_id'],
      poster_img:poster_img, 
      poster_name:poster_name, 
      post :post, 
      post_like:post_like,
      post_img:post_img,
      post_id:post_id,
      comment_count:comment_count
      }

    
    this.router.navigate(['postdetail'],{
      queryParams: data
      })
  }

}
