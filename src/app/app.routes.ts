import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/public/login/login.component';
import { RegistrateComponent } from './components/public/registrate/registrate.component';
import { Error404Component } from './components/public/error404/error404.component';
import { ProductosComponent } from './components/public/productos/productos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProductosAdminComponent } from './dashboard/productos-admin/productos-admin.component';
import { DashboardUserProductsComponent } from './components/dashboard-user-products/dashboard-user-products.component';
import { DescuentosComponent } from './components/descuentos/descuentos.component';
import { SobrenosotrosComponent } from './components/sobrenosotros/sobrenosotros.component';


export const routes: Routes = [
    {path:"", pathMatch: "full", redirectTo:"home"},
    {path:"home", component:HomeComponent},
    {path: "login", component:LoginComponent},
    {path: "productos", component:ProductosComponent},
    {path: "productosAdm", component:ProductosAdminComponent},
    {path: "promociones", component:DescuentosComponent},
    {path: "registrate", component:RegistrateComponent},
    {path: "usuarios", component:UsuariosComponent},
    {path: "sobrenosotros", component:SobrenosotrosComponent},
    {path: "dashboard", component:DashboardUserProductsComponent},
    {path: "404", component:Error404Component},
    {path: "**",pathMatch: "full", redirectTo:"404"}
];
