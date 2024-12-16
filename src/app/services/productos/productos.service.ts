import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
      token:any= sessionStorage.getItem('token')
      apiUrl: string =  "http://localhost:3000/api"
      data: any
  constructor(private http : HttpClient) {
    this.data = JSON.parse(sessionStorage.getItem("info")||"{}");
   }

      getProductos() {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.data.token}`)
        return this.http.get(`${this.apiUrl}/productos`, {headers})
      }
      deleteProductos(id: string){
        return this.http.delete(`${this.apiUrl}/eliminarProducto/${id}`)
      }
     addProductos(body: any) {
        return this.http.post(`${this.apiUrl}/crearProducto`, body)
     }
     updateproductos(id: string, body: any){
        return this.http.put(`${this.apiUrl}/actualizarProducto/${id}`,body )

     }
     

  }
