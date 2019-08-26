import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Category } from 'src/app/model/Category';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http:HttpClient) { }

  private categoryUrl = '/categories';
  private itemUrl = '/items'

  getItemsByCategory(id:number){
    return this.http.get(environment.apiUrl+this.itemUrl+"/categoryId/"+id).pipe(catchError(this.handleError));
  }

  getCategoryByKey(key:number|string){
    
    return this.http.get(environment.apiUrl+this.categoryUrl+"/"+key).pipe(catchError(this.handleError));
  }
  
    
  getItemById(id:number){
    return this.http.get(environment.apiUrl+this.itemUrl+"/"+id).pipe(catchError(this.handleError));
  }

  getItemByName(name:string){
    return this.http.get(environment.apiUrl+this.itemUrl+"/"+name).pipe(catchError(this.handleError));
  }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(environment.apiUrl+this.categoryUrl).pipe(catchError(this.handleError));
  }

  handleError<T>(operation='operation',result?:T){
    return (error:any):Observable<T>=>{
      return of(result as T)
    }
    
  }
}
