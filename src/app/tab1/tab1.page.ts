import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { AuthProvider } from 'src/providers/auth-provider';
import { IonRefresher } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild('refresher',{static:false}) refresher: IonRefresher;
  user:any;
  empty=false;
  user_img:any;
  //post= "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repudiandae officiis ut laboriosam sunt voluptatum omnis at odio nam sequi nemo! ";
  views = [] as any;
  newviews=[] as any; 
  // views =[
//   {name:"Tolulope Adeniyi", postImg:"assets/img/pic2.jpg", posterImg:"assets/img/face.jpg", post:this.post },
//   {name:"James Loren", postImg:"assets/img/pic4.jpg", posterImg:"assets/img/james.jpeg", post:this.post},
//   {name:"Faruk Apari", postImg:"", posterImg:"assets/img/faruk.jpg", post:this.post},
//   {name:"Daddy Dominique", postImg:"assets/img/pic3.jpg", posterImg:"assets/img/daddy.png", post:this.post},

// ]
done=false;
queryText: any;
  constructor(private authApi:AuthProvider,private auth:AuthService, private router:Router, public getroute:ActivatedRoute) {
    this.doRefresh(this.refresher);
    this.getroute.queryParams.subscribe((res)=>{
      console.log(res['refresh']);
      if (res['refresh']=='yes') {
       this.doRefresh(this.refresher);
      }
  });
  }
  
  
  ionViewWillEnter(){
   
    this.doRefresh(this.refresher);
    
  //   this.getroute.queryParams.subscribe((res)=>{
  //     console.log(res);
  //     this.views=res;
  // });
    
  }
  
  async ngOnInit() {
    
    // console.log(Date())
    // console.log('my date'+ dateTimeAgo);
     //> 6 minutes ago
  
this.getPost()
   
  }

  getPost(){
    let body={
     
      aksi:"getposts"
      }
  this.authApi.postData(body, 'auth.php').subscribe(async data =>{
  
    
      data['result'].forEach(element => {
      element['post_date'] = moment(element['post_date']).fromNow();
      this.views.push(element)
    });
    console.log(this.views)
 
   
    
    
   
  })

    this.user=this.auth.currentUser()

    this.user_img= this.user['image']
    console.log(this.user_img)
  }

  doRefresh(event:any){
    console.log(event)
    this.newviews =[];
if (event) {
  let body={
     
    aksi:"getposts"
    }
this.authApi.postData(body, 'auth.php').subscribe(async data =>{

  
    data['result'].forEach(element => {
       element['post_date'] = moment(element['post_date']).fromNow();
    this.newviews.push(element)
  });
  this.views=this.newviews;
  if(data['success']==true){
    event.complete();
  }
 
  
  
 
})
 
}
  }


  like(post_id:any){
    let body={
     post_liker_id:this.user.user_id,
      post_id:post_id,
      parent_id:"posts",
      post_like_date:Date(),
      aksi:"addlike"
      }
  this.authApi.postData(body, 'auth.php').subscribe(async data =>{
    console.log(data['success'])
     console.log(data['result'])
     if(data['success']==true){
       this.doRefresh(this.refresher)
     }
  })

  }
  gotoPost(){
    this.router.navigate(['post'])
  }
  profile(){
    const data= {
     url: this.router.url
    }
    this.router.navigate(['tabs/tab3'], {
      queryParams: data
    })
  }

  posterdetail(){
    const data= {
      url: this.router.url
     }
     this.router.navigate(['matedetail'], {
       queryParams: data
     })
  }

  postdetail(poster_img:any, poster_name:any,post:any,post_img:any,post_id:any,comment_count:any,post_like:any){
    const data= {
      comment_count:comment_count,
      parent_id:'posts',
      poster_img:poster_img, 
      poster_name:poster_name, 
      post :post, 
      post_like:post_like,
      post_img:post_img,
      post_id:post_id

      }

    
    this.router.navigate(['postdetail'],{
      queryParams: data
      })
  }




}
