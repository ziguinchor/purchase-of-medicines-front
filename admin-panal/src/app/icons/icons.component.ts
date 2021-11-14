import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  medicines: any;
  items: any;
  pageOfItems: Array<any>;
  isPageLoaded: boolean = false;
  bookUpdated:boolean = false;

  form : FormGroup = new FormGroup({})
  ngOnInit() {

    this.http.get('http://localhost:8080/api/medicine').subscribe(response => {
      this.medicines = response;
      console.log(this.medicines)
      this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}` }));
      this.isPageLoaded = true
    })
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  updateBook(id:any, title:string, description:string, quantity:any, price:any, companyName:any, exData:any){
    console.log(title,description, quantity, price, companyName, exData)
    console.log('ok')
    if(this.form.valid){
      this.http.put(`http://localhost:8080/api/medicine/update/admin/${id}`, {title, description, quantity, price, companyName, exData}).subscribe(response=>{
        console.log(response)
        location.reload()
      })
    }
  }

  addNew(title:string, description:string, quantity:any, price:any, companyName:any, exData:any, image:any){
    console.log(title,description, quantity, price, companyName, exData)
    console.log('ok')
    if(this.form.valid){
      this.http.post(`http://localhost:8080/api/medicine`, {title, description, quantity, price, companyName, exData,image}).subscribe(response=>{
        console.log(response)
        location.reload()
      })
    }
  }

}
