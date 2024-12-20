import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonCarritoService {

    private carrito: any[] = [];
  private carritoSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.carrito);

  constructor() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
      this.carritoSubject.next([...this.carrito]);
    }

  }

  getCarrito(): Observable<any[]> {
    return this.carritoSubject.asObservable();
  }


  agregarProducto(producto: any){
    const productoExiste= this.carrito.find(item=> item._id===producto._id)
    if(productoExiste){
      productoExiste.cantidad++
    }else{
      this.carrito.push({...producto, cantidad:1})
    }
    // Actualizar el subject cada vez que se modifica el carrito
    this.carritoSubject.next([...this.carrito]);
    // Guardar en localStorage para persistencia
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  elimarProducto(productId:number){
    this.carrito=this.carrito.filter(item=>item._id !==productId)
    this.carritoSubject.next([...this.carrito])
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  cacularTotal(){
    return this.carrito.reduce((total, item)=> total+item.precio*item.cantidad,0)
  }
  cacularTotalC(){
    return this.carrito.reduce((total, item)=> total+item.cantidad,0)
  }

  reiniciarCarrito() {
    this.carrito = [];
    this.carritoSubject.next([]);
    localStorage.removeItem('carrito');
  }
}
