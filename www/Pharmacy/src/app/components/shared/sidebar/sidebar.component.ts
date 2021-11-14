import { Component, Input, OnInit } from '@angular/core';
// import { LabelType, Options } from 'ng5-slider/options';
// import { LabelType, Options } from 'ng5-slider';
import { Options } from '@angular-slider/ngx-slider';
import{ LabelType} from "@angular-slider/ngx-slider"
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // title ="";
  // @Input title:string ="";
  // @Input() Title = '';


  constructor(private apiService: ApiService ) {

  }
  users: any;
 books: any;
  responseGet: Boolean = false

  ngOnInit(): void {
    // this.http.get('http://localhost:8080/api/users').subscribe(res=>{
    //   this.users = res
    //   this.responseGet = true
    //   console.log(res)
    // })

    const token = localStorage.token

    this.apiService.get('http://localhost:8080/api/books',
      { headers: { 'Authorization': `Bearer ${token}` } })
      .subscribe(res => {
        console.log(res)
        this.books = res;
        this.responseGet = true;
      })
  }






  // Search() {
  //   console.log(this.title)
  //   if (this.title != "") {
  //     this.books = this.books.filter((res: { title: string; }) => {
  //       return res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase())
  //     });
  //   }
  //   else if (this.title == "") {
  //     this.ngOnInit();
  //   }
  // }
  getCatBooks(id:string){

    const token = localStorage.token
    this.apiService.get(`http://localhost:8080/api/categories/${id}`,
      { headers: { 'Authorization': `Bearer ${token}` } })
      .subscribe(res => {
        console.log(res)
        this.books = res;
        this.responseGet = true
      },
      (err => {
        console.log(err);
      }))
  }

  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    showSelectionBar: true,
    selectionBarGradient: {
      from: '#fcba03',
      to: '#fcba03',
    },
    getPointerColor: function(value) {
      if (value <= 500)
          return '#b91d23';
      if (value <= 6)
          return 'orange';
      if (value <= 9)
          return 'yellow';
      return '#2AE02A';
  },

    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "  <b>الاقل سعر:</b> " + value+"جنيه";
        case LabelType.High:
          return " <b>الاعلي سعر:</b> " + value +"جنيه";
        default:
          return "جنيه" + value;
      }
    }
  };


}
