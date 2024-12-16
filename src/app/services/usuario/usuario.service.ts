import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiUrl: string =  "http://localhost:3000/api"
  data: any
  constructor(private http : HttpClient) {
    this.data = JSON.parse(sessionStorage.getItem("info")||"{}");
   }

    traerUsuarios (){
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.data.token}`)
        return this.http.get(`${this.apiUrl}/usuarios`,{headers})
    }
    eliminarUsuario (id: string){
        return this.http.delete(`${this.apiUrl}/eliminarUsuario/${id}`)
    }
    crearUsuario (body : any){
        return this.http.post(`${this.apiUrl}/crearUsuario`, body)
    }
    actualizarUsuario(id: string, body:any){
        return this.http.put(`${this.apiUrl}/actualizar/${id}`, body)
    }
    obtenerUnUsuario (id: string) {
        return this.http.get(`${this.apiUrl}/usuario/${id}`)
    }
    iniciarSesion(body: any){
        return this.http.post(`${this.apiUrl}/inicioSesion`, body)
    }
    //  desencriptarToken (){
    //     const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    //     return this.http.get(`${this.apiUrl}/infoToken`,{headers})
    // }
}
