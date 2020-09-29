import { Component, ViewChild, ElementRef , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins, CameraResultType,CameraSource  } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { AuthProvider } from 'src/providers/auth-provider';
import { AuthService } from '../auth.service';
import { Platform, ActionSheetController } from '@ionic/angular';


const { Camera } = Plugins;

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  mypost:any="";
  user:any
  user_img:any;
  img:any=null;
  guestPicture:any
  photourl:any
  constructor( private plt: Platform, private actionSheetCtrl: ActionSheetController,private router:Router, private alert:AlertController, private authApi:AuthProvider,private auth:AuthService) { }

  ngOnInit() {
    this.user=this.auth.currentUser();
    this.user_img = this.user['image']
    console.log(this.user)
    console.log(this.user_img)
  }

   async Alert() {
    const alert = await this.alert.create({
        message: "Save Post?",
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              this.router.navigate(['/tabs/tab1'])
            }
          },
          {
            text: 'Yes',
            handler: () => {
              console.log('post saved')
              this.router.navigate(['/tabs/tab1'])
           
            }
          }
        ]
      })
  
    await alert.present();
  }

  async Alert2(msg:any) {
    const alert = await this.alert.create({
        message: "Error",
        subHeader:msg,
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
close(){
  if(this.mypost == ""){
     const result={
    refresh:'no'
  }
  this.router.navigate(['tabs/tab1'],{
    queryParams:result
  })
  }else{
    this.Alert();
  }

}

post(){

  

  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
var string_length = 16;
var randomstring = '';
for (var i=0; i<string_length; i++) {
var rnum = Math.floor(Math.random() * chars.length);
randomstring += chars.substring(rnum,rnum+1);
}
  let body={
  user_id: this.user.user_id,
  post_id:randomstring,
  post_img:this.img,
  post:this.mypost,
  poster_img:this.user_img,
  poster_name:this.user.username,
  date:Date(),
  aksi:"post"
  }
 
    this.authApi.postData(body, 'auth.php').subscribe(async data =>{
console.log(data['success'])
console.log(data['msg'])
if (data['success']==true) {

  const result={
    refresh:'yes'
  }
  this.router.navigate(['tabs/tab1'],{
    queryParams:result
  })
}else{
  this.Alert2(data['msg'])
}

})
  

}

// async takePicture() {
//   const image = await Camera.getPhoto({
//     quality: 90,
//     allowEditing: true,
//     resultType: CameraResultType.Uri
//   });

//   var imageUrl = image.webPath;
//   console.log(imageUrl);
// }

async selectImageSource() {
  const buttons = [
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

  // Only allow file selection inside a browser
  // if (!this.plt.is('hybrid')) {
  //   buttons.push({
  //     text: 'Choose a File',
  //     icon: 'attach',
  //     handler: () => {
  //       this.fileInput.nativeElement.click();
  //     }
  //   });
  // }

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




});
}
}
