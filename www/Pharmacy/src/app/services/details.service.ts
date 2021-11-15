import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private _apisevice: ApiService) {
  }
  getBookDetails(id:number,headers: any
  ) {
  return this._apisevice.get(`http://localhost:8080/api/medicine/${id}`,headers);
}
addBookComment(id:number, body:any,headers: any){
  return this._apisevice.post(`http://localhost:8080/api/comments/${id}`,body,headers);
}
updateBookRate(id:number, body:any,headers:any){
return this._apisevice.put(`http://localhost:8080/api/medicine/update/${id}`,body,headers);
}
getAllCategoryBooks(id:number,headers:any){
return this._apisevice.get(`http://localhost:8080/api/categories/${id}`,headers);
}
}
