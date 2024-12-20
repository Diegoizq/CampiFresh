import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonCarritoService {

    private carrito: any[] = [];
  private carritoSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.carrito);

  constructor() { }

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
  }

  elimarProducto(productId:number){
    this.carrito=this.carrito.filter(item=>item._id !==productId)
    this.carritoSubject.next([...this.carrito])
  }

  cacularTotal(){
    return this.carrito.reduce((total, item)=> total+item.precio*item.cantidad,0)
  }
}
