import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProvider } from '../../providers/auth-provider'
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.page.html',
  styleUrls: ['./sigin.page.scss'],
})
export class SiginPage implements OnInit {
  name:any;
  set:any;
  pass:any;
  sets =[
    // {name:"Tolulope Adeniyi",posterImg:"assets/img/face.jpg" },
    {year:'2018'},
    {year:'2019'},
    {year:'2020'},
    {year:'2021'},
    {year:'2022'},
    {year:'2023'},
    {year:'2024'},
    {year:'2025'},
   
  ]
  constructor(
    public loader:LoadingController,
    public authApi:AuthProvider,
    public router:Router,
    public auth:AuthService,
    public alert:AlertController
    ) { }

  ngOnInit() {
  }

  async Alert(msg:any,sub:any) {
    const alert = await this.alert.create({
        message: msg,
        subHeader:sub,
        buttons: [
         
          {
            text: 'ok',
            handler: () => {
           alert.dismiss()
            }
          }
        ]
      })
  
    await alert.present();
  }

  Login(){

    this.loader.create({

      spinner:'bubbles',
      message: 'please wait...',
      duration:3000
    }).then((res)=>{
      res.present();
    let body={
      name:this.name,
      pass:this.pass,
      set:this.sets,
    aksi:"login"
    }
this.authApi.postData(body, 'auth.php').subscribe(async data =>{

  console.log(data['result'])
  if (data['success']==true) {
    this.auth.setUser(data['result'])
    res.dismiss();
  

    res.onDidDismiss().then((dis)=>{
      console.log(dis)
      this.router.navigate(['tabs/tab1'],{
        queryParams: data['result']
        });
      console.log('dismissed')
    })

  }else{
    res.onDidDismiss().then((dis)=>{
      this.Alert(data['msg'],'Error');
    })
  }
    
  
  
})

})

  }


}
