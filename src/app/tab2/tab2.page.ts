import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthProvider } from '../../providers/auth-provider';
import { AuthService } from '../auth.service';
// import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  loadedmates:any;
  done=false;
  statusText='Loading...'
  dmates = [] as any; 
  mates = [] as any; 
  newmates = [] as any; 
  // mates =[
  //   // {name:"Tolulope Adeniyi",posterImg:"assets/img/face.jpg" },
  //   {name:"James Loren",  posterImg:"assets/img/james.jpeg"},
  //   {name:"Faruk Apari",  posterImg:"assets/img/faruk.jpg"},
  //   {name:"Daddy Dominique", posterImg:"assets/img/daddy.png"},
  //   // {name:"Tolulope Adeniyi",posterImg:"assets/img/face.jpg" },
  //   {name:"James Loren",  posterImg:"assets/img/james.jpeg"},
  //   {name:"Faruk Apari",  posterImg:"assets/img/faruk.jpg"},
  //   {name:"Daddy Dominique", posterImg:"assets/img/daddy.png"},
  //   // {name:"Tolulope Adeniyi",posterImg:"assets/img/face.jpg" },
  //   {name:"James Loren",  posterImg:"assets/img/james.jpeg"},
  //   {name:"Faruk Apari",  posterImg:"assets/img/faruk.jpg"},
  //   {name:"Daddy Dominique", posterImg:"assets/img/daddy.png"},
  //   // {name:"Tolulope Adeniyi",posterImg:"assets/img/face.jpg" },
  //   {name:"James Loren",  posterImg:"assets/img/james.jpeg"},
  //   {name:"Faruk Apari",  posterImg:"assets/img/faruk.jpg"},
  //   {name:"Daddy Dominique", posterImg:"assets/img/daddy.png"}
  // ]
  user:any;
  
  constructor( private authApi:AuthProvider,private router:Router, private arouter:ActivatedRoute, public auth:AuthService) {

  }

 

   async ngOnInit() {

     this.user=this.auth.currentUser();

     setTimeout(() => {
       this.done=true;
       
     }, 3000);
  
   
      // this.afstore.collection('unilorin').doc(`civil`).collection('2019').valueChanges()
      // .subscribe(res=>{
     
      //   this.dmates= res;
      //   this.done=true
      // },error => {
      //   console.log(error);
      //   });
    
     

   

    let body={
     
    aksi:"getmate"
    }
this.authApi.postData(body, 'auth.php').subscribe(async data =>{

  data['result'].forEach(element => {
    if(element['user_id'] !== this.user.user_id){
      this.mates.push(element)
    }
  });
  //this.mates = data['result'];
  console.log(this.mates)
  this.loadedmates = this.mates;
 
})

    }

    doRefresh(event:any){
      this.newmates = []; 
      if (event) {
        
    let body={
     
      aksi:"getmate"
      }
        this.authApi.postData(body, 'auth.php').subscribe(async data =>{

          data['result'].forEach(element => {
            this.newmates.push(element)
          });
          //this.mates = data['result'];
          console.log(this.mates)
          this.mates = this.newmates;
         
          if(data['success']==true){
            event.target.complete();
          }
        })
        
        
       
      }
        }

  viewmate(posterImg:any,username:any ,image:any){

//     this.afstore.doc(`unilorin/civil/2019/1430GC019`).set({
//       name:"Faruk Apari",
//       matric:"1430GD019",
//       nick:"Apa"
//   })
//   this.afstore.doc(`unilorin/civil/2019/1430GC017`).set({
//     name:"James Loren",
//     matric:"1430GD017",
//     nick:"Jamla"
// })
// this.afstore.doc(`unilorin/civil/2019/1430GC016`).set({
//   name:"Damilola John",
//   matric:"1430GD016",
//   nick:"DJ"
// })
// this.afstore.doc(`unilorin/civil/2019/1430GC015`).set({
//   name:"Yinka Kayode",
//   matric:"1430GD015",
//   nick:"Yk"
// })

// this.afstore.doc(`unilorin/civil/2019/1430GC018`).set({
//   name:"Odetunde Martins",
//   matric:"1430GD018",
//   nick:"Mr Mode"
// })
        const data= {
          url:this.router.url,
        posterImg:posterImg, 
        username:username, 
        image:image,
        matric:'13/30gc018'
      }

    
    this.router.navigate(['matedetail'],{
      queryParams: data
      })

    
  }

  initializeItems(): void {
    this.mates = this.loadedmates;
    }



    update(evt:any) {
      this.initializeItems(); 
      
      const searchTerm = evt.srcElement.value;
      
      if (!searchTerm) {

       return;
    }
      
      this.mates = this.mates.filter(currentGoal => {
      if (currentGoal.name && searchTerm)  {
      if (currentGoal.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
      return true;
      }
      
      }
      });
      }
}
