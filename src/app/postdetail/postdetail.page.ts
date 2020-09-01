import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.page.html',
  styleUrls: ['./postdetail.page.scss'],
})
export class PostdetailPage implements OnInit {

  post= "Lorem ipsum dolor sit amet consectetur adipisicing elit.Repudiandae officiis ut laboriosam sunt voluptatum omnis at odio nam sequi nemo! ";
  comments =[
    {name:"Tolulope Adeniyi", postImg:"assets/img/pic2.jpg", posterImg:"assets/img/face.jpg", post:this.post },
    {name:"Jame Loren", postImg:"assets/img/pic4.jpg", posterImg:"assets/img/james.jpeg", post:this.post},
    {name:"Faruk Apari", postImg:"", posterImg:"assets/img/faruk.jpg", post:this.post},
    {name:"Daddy Dominique", postImg:"assets/img/pic3.jpg", posterImg:"assets/img/daddy.png", post:this.post},
  
  ]
view=null;
no=null;
  constructor(private getroute:ActivatedRoute, private router:Router) { }

  ngOnInit() {
this.no = 1;
    this.getroute.queryParams.subscribe((res)=>{
      console.log(res);
      this.view=res;
  });
  }

  postback(){
    this.router.navigate(['tabs/tab1'])
  }
  postdetail(posterImg:any, name:any,post:any,postImg:any){
    const data= {
        posterImg:posterImg, 
        name:name, 
        post :post, 
        postImg:postImg
      }

    
    this.router.navigate(['postdetail'],{
      queryParams: data
      })
  }

}
