import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Plugins, CameraResultType,CameraSource  } from '@capacitor/core';
import { AuthProvider } from 'src/providers/auth-provider';
import { Platform, ActionSheetController,AlertController, LoadingController} from '@ionic/angular';


const { Camera } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  username:any;
  nickname:any;
  birthday:any;
  phone:any;
  img:any=null
  icon:any;
  user:any;
  hobby=' ';
  basic_class="none"
  contact_class="none"
  social_class="none"
basic="pencil";
social="pencil";
contact="pencil"
basic_input=true
contact_input=true
social_input=true
route;
user_img:any;
  constructor(public alert:AlertController, public loader:LoadingController,public authApi:AuthProvider, private actionSheetCtrl: ActionSheetController,public getroute:ActivatedRoute, public alertCtrl: AlertController, private router:Router, private auth:AuthService) {}

  ngOnInit(): void {
   this.user= this.auth.currentUser();
   console.log(this.user)
   this.user_img= this.user['image']
this.username=this.user['username']
this.nickname=this.user['nickname']
this.birthday=this.user['birthday']
this.phone=this.user['phone']
   this.getroute.queryParams.subscribe((res)=>{
    console.log(res);
    this.route=res;
});
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
edit(i:any){

 switch (i) {
   case 'basic':
    this.social="pencil";
    this.contact="pencil"
     if (this.basic!=='pencil') {
    this.basic = "pencil"
    this.basic_input=true
    this.basic_class="none"
    this.loader.create({

      spinner:'bubbles',
      message: 'please wait...',
      duration:3000
    }).then((res)=>{
      res.present();
console.log(this.username)
    let body ={
      username:this.username,
      nickname:this.nickname,
      birthday:this.birthday,
      phone:this.phone,
      user_id:this.user.user_id,
      aksi: 'updateBasic'
    }
    this.authApi.postData(body, 'auth.php').subscribe(async data =>{
console.log(data['msg'])

if (data['success']==true) {
  res.dismiss();
}

  res.onDidDismiss().then((dis)=>{
    console.log(dis)
    this.Alert('Profile Updated','Success');
    let body ={
      username:this.username,
      user_id:this.user.user_id,
      aksi: 'updatePost'
    }
    this.authApi.postData(body, 'auth.php').subscribe(async data =>{
        console.log(data['msg'])
    })

    
  })

    })
   console.log('updated successfully'+this.username);
   
     })
    }else {
      this.basic='checkmark-sharp'
      this.basic_input=false
      this.basic_class="basic_class"
     }
     break;

   case 'contact':
    this.basic="pencil";
    this.social="pencil";
     if (this.contact!=='pencil') {
    this.contact = "pencil"
    this.contact_input=true
    this.contact_class="none"
     }else {
      this.contact='checkmark-sharp';
      this.contact_input=false
      this.contact_class="contact_class"
      
     }
     break;

  case 'social':
    this.basic="pencil";
    this.contact="pencil"
    if (this.social!=='pencil') {
   this.social = "pencil"
   this.social_input=true
   this.social_class="none"
    }else {
     this.social='checkmark-sharp'
     this.social_input=false
     this.social_class="social_class"
    }
    break;

   default:
     break;
 }
  this.icon = "checkmark-sharp"
}

async addHobby() {
  const prompt = await this.alertCtrl.create({
    header: 'NEW HOBBY',
    message: "add a new hobby here",
    inputs: [
      {
        name: 'HOBBY',
        placeholder: 'Your hobby'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Add',
        handler: data => {
         
           this.hobby=data.HOBBY;
           if(this.hobby=== null) {
            
          }else{
            console.log(this.hobby);
          // this.db.list('/chatTopic').push({
           
          //   topic: this.topic,
          //   username:this.username,
          // }).then(()=>{
      
          // })
        }
        }
      }
    ]
  });
  prompt.present();
}


async selectImageSource() {
  const buttons = [

    {
      text: 'View Photo',
      icon: 'eye',
      handler: () => {
        // this.addImage(CameraSource.Camera);
      }
    },
    {
      text: 'Take Photo',
      icon: 'camera',
      handler: () => {
        this.addImage(CameraSource.Camera);
      }
    },
    {
      text: 'Choose From gallery',
      icon: 'image',
      handler: () => {
        this.addImage(CameraSource.Photos);
      }
    }
  ];


  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Select Image Source',
    buttons
  });
  await actionSheet.present();
}


async addImage(source: CameraSource) {
  const image =await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source
    }).then((imageData) => {
      
  
  this.img= imageData.base64String;
  

  let body={
   
    img:this.img,
    user_id:this.user.user_id,
    aksi:"updateImg"
    }
   
      this.authApi.postData(body, 'auth.php').subscribe(async data =>{})
  
  
  
  });
  }
}
