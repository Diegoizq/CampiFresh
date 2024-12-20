import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegistrateComponent } from './components/public/registrate/registrate.component';
import { Error404Component } from './components/public/error404/error404.component';
import { ProductosComponent } from './components/public/productos/productos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProductosAdminComponent } from './dashboard/productos-admin/productos-admin.component';
import { ImagenesComponent } from './components/imagenes/imagenes.component';
import { DashboardUserProductsComponent } from './components/dashboard-user-products/dashboard-user-products.component';
<<<<<<< HEAD
import { CarritoComponent } from './components/pagarcarrito/carrito.component';
import { GraciasComponent } from './components/gracias/gracias.component';
=======
import { DescuentosComponent } from './components/descuentos/descuentos.component';
import { SobrenosotrosComponent } from './components/sobrenosotros/sobrenosotros.component';
<<<<<<< HEAD
import { ImagenesComponent } from './components/imagenes/imagenes.component';
=======
import { ContactoComponent } from './components/contacto/contacto.component';
import { GraciasComponent } from './components/gracias/gracias.component';
import { CarritoComponent } from './components/pagarcarrito/carrito.component';
>>>>>>> 7fa306ece9c9e6aa523b15e6aca73930a1ed968e
>>>>>>> main


export const routes: Routes = [
    {path:"", pathMatch: "full", redirectTo:"home"},
    {path:"home", component:HomeComponent},
    {path:"imagenes",component:ImagenesComponent},
    {path: "login", component:LoginComponent},
    {path: "productos", component:ProductosComponent},
    {path: "productosAdm", component:ProductosAdminComponent},
    {path: "promociones", component:DescuentosComponent},
    {path: "registrate", component:RegistrateComponent},
<<<<<<< HEAD
    {path: "dashboard", component:DashboardUserProductsComponent},
    {path: "pagarC", component: CarritoComponent},
    {path:"gracias",component:GraciasComponent},
=======
    {path: "usuarios", component:UsuariosComponent},
    {path: "sobre-nosotros", component:SobrenosotrosComponent},
    {path: "dashboard", component:DashboardUserProductsComponent},
    {path: "contacto", component:ContactoComponent},
    {path: "gracias", component:GraciasComponent},
    {path: "pago", component:CarritoComponent},
>>>>>>> main
    {path: "404", component:Error404Component},
    {path: "**",pathMatch: "full", redirectTo:"404"}
];
