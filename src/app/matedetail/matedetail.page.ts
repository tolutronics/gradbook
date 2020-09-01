import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-matedetail',
  templateUrl: './matedetail.page.html',
  styleUrls: ['./matedetail.page.scss'],
})
export class MatedetailPage implements OnInit {
  mate=null;
  constructor(private arouter:ActivatedRoute, private router:Router) { }

  ngOnInit() {

    this.arouter.queryParams.subscribe((res)=>{
      console.log(res);
      this.mate=res;
  });
  }

  colleague(){
this.router.navigateByUrl(`${this.mate.url}`)
  }

}
