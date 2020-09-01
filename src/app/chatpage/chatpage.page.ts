import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.page.html',
  styleUrls: ['./chatpage.page.scss'],
})
export class ChatpagePage implements OnInit {
  mate=null;
  msgs =[
    {name:"Emma",  text:"Hello bro", time:"2:45pm" }, 
    {name:"Tolu",  text:"Hello bro", time:"2:45pm" },
    {name:"Emma",  text:"Whatsup with you", time:"2:45pm" },
    {name:"Tolu",  text:"      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, quidem suscipit eum repellendus excepturi accusantium odio nulla fugiat. Laborum facere similique praesentium aliquid non delectus soluta dolorum asperiores tempora aspernatur!", time:"2:45pm" },
    {name:"Emma",  text:"i'am fine too",time:"2:45pm" },
    {name:"Tolu",  text:"Where are you now", time:"2:45pm" },
    {name:"Emma",  text:"i am in Lagos", time:"2:45pm" },
  
  ]
  constructor(private arouter:ActivatedRoute, private router:Router) { }

  ngOnInit() {

    this.arouter.queryParams.subscribe((res)=>{
      console.log(res);
      this.mate=res;
   });
  }

  back(){
    console.log('tolux')
    this.router.navigate(['/tabs/tab4'])
  }

}
