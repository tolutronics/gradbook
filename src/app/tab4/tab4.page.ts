import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProvider } from 'src/providers/auth-provider';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  user:any;
  mates =[] as any
  constructor(public router:Router, private authApi:AuthProvider, private auth:AuthService) { }

  ngOnInit() {

    this.user= this.auth.currentUser();

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
   
  })
  }
  viewchat(posterImg:any,name:any,user_id:any){
    const data= {
      posterImg:posterImg, 
      name:name,
      user_id:user_id,
      count:null
    }

  
  this.router.navigate(['chatpage'],{
    queryParams: data
    })
  }
}
