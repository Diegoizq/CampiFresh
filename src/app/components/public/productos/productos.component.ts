import { Component, inject } from '@angular/core';
import { ProductosService } from '../../../services/productos/productos.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonCarritoService } from '../../../services/button-carrito/button-carrito.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [ ReactiveFormsModule,CommonModule ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
    products: any[]=[]
    productosFiltrados: any[] = [];
    pruductosService = inject(ProductosService)
    private carritoService = inject(ButtonCarritoService)
    formProduct!: FormGroup
    fomrEdit!: FormGroup

    constructor (private fb: FormBuilder,
        private router : Router
    ){
        this.formProduct= this.fb.group({
            nombre:['',[Validators.required]],
            precio:['',[Validators.required]],
            imagen:['',[Validators.required]]
        })
        this.fomrEdit=this.fb.group({
            nombre:['',[Validators.required]],
            precio:['',[Validators.required]],
            imagen:['',[Validators.required]]
        })


    }
    ngOnInit() {
        this.pruductosService.getAll().subscribe({
          next: (resApi: any) => {
            console.log(resApi);
            this.products = resApi;
            this.productosFiltrados = resApi; // Inicialmente mostramos todos
          },
          error: () => {
            console.error("Error al cargar los productos");
          }
        });
      }

      // Método para filtrar por tipo
      filtrarPorTipo(tipo: string): void {
        if (tipo === 'todos') {
          this.productosFiltrados = this.products; // Mostrar todos los productos
        } else {
          this.productosFiltrados = this.products.filter(
            (producto: any) => producto.tipo.toLowerCase() === tipo.toLowerCase()
          );
        }
      }

      agregarCarrito(producto:any){
        console.log("producto a agregaar", producto);
        this.carritoService.agregarProducto(producto)
        Swal.fire({
          toast: true,
          position: 'center',
          icon: 'success',
          title: `${producto.nombre} agregado al carrito`,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });

      }



    eliminar(id:string){
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            this.pruductosService.deleteProductos(id).subscribe({
                next:(resApi: any)=>{
                    this.ngOnInit()
                    if (result.isConfirmed) {
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your file has been deleted.",
                          icon: "success"
                        });
                      }
                },
                error:(error: any)=>{
                    if (result.isConfirmed) {
                        Swal.fire({
                          title: "can not Deleted!",
                          text: "Your file has not been deleted.",
                          icon: "error"
                        });
                      }


                }
            })

          });

    }
    agregarProducto(){
        console.log(this.formProduct.value);

        this.pruductosService.addProductos(this.formProduct.value).subscribe({
        next:(resApi: any)=>{
            Swal.fire({
                title: "creado!",
                text: "Your file has been created.",
                icon: "info"

            })
        },
        error:(error)=>{
            Swal.fire({
                title: "can not create!",
                text: "Your file has not been created.",
                icon: "error"
            })


        }})
    }

    editarProducto(id: string){
        this.pruductosService.getoneproduct(id).subscribe({
            next:(resApi: any)=>{
                console.log(resApi);

                this.fomrEdit.setValue({
                nombre: resApi.nombre,
                precio: resApi.precio,
                imagen: resApi.imagen
            })


            },
            error:(error: any)=>{

            }

        })

    }
    actualizarProducto(id: string){
        this.pruductosService.updateproductos(id, this.fomrEdit.value).subscribe({
            next:(resApi: any)=> {
                console.log(this.fomrEdit.value);
                this.ngOnInit()

                Swal.fire({
                    title: "actualizado!",
                    text: "tu producto ha sido actualizado",
                    icon: "success"
                  });
                },
            error:(error: any)=> {
                console.log(error);

            }

        })
    }
}
