import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonCarritoService } from '../../services/button-carrito/button-carrito.service';
import { filter } from 'rxjs';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-button-carrito',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink],
  templateUrl: './button-carrito.component.html',
  styleUrl: './button-carrito.component.css'
})
export class ButtonCarritoComponent {
    private carritoService= inject(ButtonCarritoService)

  isCartOpen = false;
  BtnCarritoDeCompras= true;
  carrito: any[]=[]
  total: number=0;
  totalC: number=0;


  //Vamos a ocultar el carrito en estas rutas

  private OcultarBtnCarrito=[
    '/login',
    '/register',
  ];

  constructor(private router: Router){}

    ngOnInit() {
      this.router.events.pipe(
        filter(event=>event instanceof NavigationEnd)
      ).subscribe((event:any)=>{
        this.BtnCarritoDeCompras= !this.OcultarBtnCarrito.includes(event.url)
      });
      this.carritoService.getCarrito().subscribe((carrito: any[]) => {
        this.totalC = carrito.reduce((total, item) => total + item.cantidad, 0);
      });
    }




//Abri y cerrar la lista de carrito
toggleCart() {
  this.isCartOpen = !this.isCartOpen;
  if (this.isCartOpen) {
    this.actualizarCarrito();
  }
}

actualizarCarrito() {
  this.carritoService.getCarrito().subscribe((carrito: any) => {
    this.carrito = carrito;  // Ahora 'carrito' es un array de productos
    this.total = this.carritoService.cacularTotal();
    this.totalC = this.carritoService.cacularTotalC()  // Calculamos el total
    console.log('Carrito actualizado:', this.carrito);  // Verifica si el carrito está siendo actualizado
    console.log('Total:', this.total);  // Verifica si el total se calcula correctamente
  });
}



eliminarProducto(productId: number) {
  this.carritoService.elimarProducto(productId);
  console.log("producto eliminado :",this.carritoService);
    // Eliminar producto del carrito
}


}
