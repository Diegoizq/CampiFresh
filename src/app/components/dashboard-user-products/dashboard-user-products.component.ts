import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos/productos.service';

@Component({
  selector: 'app-dashboard-user-products',
  standalone: true,
  imports: [ SidebarComponent, CommonModule],
  templateUrl: './dashboard-user-products.component.html',
  styleUrl: './dashboard-user-products.component.css'
})
export class DashboardUserProductsComponent {
    products: any[]=[]
    pruductosService = inject(ProductosService)


    

    ngOnInit() {
        this.pruductosService.getAll().subscribe({
          next: (resApi: any) => {
            console.log(resApi);
            this.products = resApi; // Inicialmente mostramos todos
          },
          error: () => {
            console.error("Error al cargar los productos");
          }
        });
      }

  currentSection: string = 'productos';
  changeSection(section: string) {
    this.currentSection = section;
  }
  }


