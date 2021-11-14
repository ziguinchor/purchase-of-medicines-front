import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  users:any;
  isPageLoaded:boolean = false

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:8080/api/users').subscribe((response)=>{
      this.users = response
      this.isPageLoaded = true
    })
  }


  deleteUser(id:any, index:number){
    this.http.delete(`http://localhost:8080/api/users/${id}`).subscribe(response=>{
      this.users.splice(index, 1)
    })
  }

}
