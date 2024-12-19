import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    constructor(private router : Router){
        this.updateMenuItems();
    }
    estado: boolean = false
    roll: boolean = false
    isMenuOpen: boolean = false;
    menuItems: any[] = [];



    ngOnInit() {
        const info = JSON.parse(sessionStorage.getItem('info') || "{}");

        if (info && info.token) {
            this.estado = true;
        } else {
            this.estado = false;
        }

        if (info && info.roll) {
            if (info.roll === "admin") {
                this.roll = true;
            } else {
                this.roll = false;
            }
        } else {
            this.roll = false;
        }

        this.updateMenuItems();  // Actualizamos los items del menú
    }


    updateMenuItems() {
        // Items básicos que siempre están presentes
        const baseItems = [
            { path: '/inicio', title: 'Inicio' },
            { path: '/productos', title: 'Productos' },
            { path: '/sobre-nosotros', title: 'Sobre Nosotros' },
            { path: '/contacto', title: 'Contacto' }
        ];

        // Si no está logueado, mostrar opción de login
        if (!this.estado) {
            this.menuItems = [
                ...baseItems,
                { path: '/login', title: 'Iniciar Sesión' }
            ];
        }
        // Si está logueado como admin
        else if (this.roll) {
            this.menuItems = [
                ...baseItems,
                { path: '/productosAdm', title: 'Productos Admin' },
                { path: '/dashboard', title: 'Dashboard' }
            ];
        }
        // Si está logueado como usuario normal
        else {
            this.menuItems = [
                ...baseItems,
                { path: '/productosAdm', title: 'Productos Admin' }
            ];
        }
    }
ngDoCheck(){
    this.ngOnInit()
}

logout() {
    sessionStorage.removeItem('info');
    this.router.navigate(['login']);
    this.estado = false;
    this.roll = false;
    this.updateMenuItems();
}


  // Añade esta línea

<<<<<<< HEAD
=======
menuItems = [
  { path: '/inicio', title: 'Inicio' },
  { path: '/productos', title: 'Productos' },

  { path: '/promociones', title: 'Promociones' },
  { path: '/sobrenosotros', title: 'Sobre Nosotros' },
//   { path: '/login', title: 'Iniciar Sesión' },

//   { path: '/productosAdm', title: 'Productos Admin' },
  { path: '/dashboard', title: 'Dashboard' }


];
>>>>>>> main


toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

}

