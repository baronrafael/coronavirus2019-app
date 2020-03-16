import { Component, OnInit } from '@angular/core';
import { NovelcovidService } from 'src/app/core/services/novelcovid.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  generalInfo: any;

  constructor(
    private novelCovid: NovelcovidService
  ) { }

  ngOnInit(): void {
    this.getAllInfo();
  }

  getAllInfo(){
    this.novelCovid.getAllInfo()
    .subscribe(
      (res) => {
        //console.log(res)
        this.generalInfo = res;
        console.log(this.generalInfo);
      },
      (err) => {
        console.log(err);
      },
    );
  }

}
