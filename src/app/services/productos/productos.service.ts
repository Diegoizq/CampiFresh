import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
      token:any= sessionStorage.getItem('token')
      apiUrl: string =  "http://localhost:3000/api"
      apiUrlP: string="http://localhost:3333/productos"
      data: any
  constructor(private http : HttpClient) {
    this.data = JSON.parse(sessionStorage.getItem("info")||"{}");
   }

      getProductos() {
        return this.http.get(`${this.apiUrlP}`)
      }

      getAll(): Observable <any> {
        return this.http.get<any[]>(this.apiUrlP);
      }
      deleteProductos(id: string){
        return this.http.delete(`${this.apiUrlP}/${id}`)
      }
     addProductos(body: any) {
        return this.http.post(`${this.apiUrl}/crearProducto`, body)
     }
     updateproductos(id: string, body: any){
        return this.http.put(`${this.apiUrlP}/${id}`,body )

     }
<<<<<<< HEAD
     getoneproduct(id: string,){
        return this.http.get(`${this.apiUrl}/producto/${id}`)
     }
=======

     getoneproduct(id: string,){
        return this.http.get(`${this.apiUrlP}/${id}`)
     }

>>>>>>> main

  }
