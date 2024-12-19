import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos/productos.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario/usuario.service';


@Component({
  selector: 'app-dashboard-user-products',
  standalone: true,
  imports: [ SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard-user-products.component.html',
  styleUrl: './dashboard-user-products.component.css'
})
export class DashboardUserProductsComponent {
    products: any[]=[]
    pruductosService = inject(ProductosService)
    userService = inject(UsuarioService)
    formEdit!: FormGroup
    formEditUsers!: FormGroup
    usuarios:any[]=[]

    constructor(private fb: FormBuilder,private router : Router){
        this.formEdit= this.fb.group({
            nombre:["", []],
            tipo:[" ",[]],
            precio:[" ",[]],
            stock:[" ", []],
            descripcion:[" ",[]],
            imagen:[" ", []]

        })
        this.formEditUsers=this.fb.group({
            nombre :['', []],
            apellido :['', []],
            email:['', []],
            imagen:['', []]
        })

    }

    update(id: string) {
        this.pruductosService.updateproductos(id, this.formEdit.value).subscribe({
            next: (resApi: any) => {
                console.log(this.formEdit.value);

                // Cerrar el modal manualmente
                const modalElement = document.getElementById(id);
                if (modalElement) {
                    modalElement.style.display = 'none';
                    modalElement.classList.remove('show');
                }

                // Remover el backdrop
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) {
                    backdrop.parentNode?.removeChild(backdrop);
                }

                // Remover la clase modal-open del body
                document.body.classList.remove('modal-open');
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';

                // Recargar los datos
                this.ngOnInit();
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }


    getProducto(id: string){
        this.pruductosService.getoneproduct(id).subscribe({
            next:(resApi: any)=>{
                console.log(resApi);
                this.formEdit.setValue({
                    nombre:resApi.nombre,
                    tipo:resApi.tipo,
                    precio:resApi.precio,
                    stock:resApi.stock,
                    descripcion:resApi.descripcion,
                    imagen:resApi.imagen,


                })


            },

            error:(error:any)=>{
                console.log(error);


            }



        })
    }




    ngOnInit() {
        this.pruductosService.getAll().subscribe({
          next: (resApi: any) => {
            console.log(resApi);
            this.products = resApi
             // Inicialmente mostramos todos
          },
          error: () => {
            console.error("Error al cargar los productos");
          }

        });
        console.log(this.usuarios);

        if (sessionStorage.getItem('info')== undefined||null){
            this.router.navigate(['login'])
        }

        this.userService.traerUsuarios().subscribe({
            next:(resApi: any)=> {
                console.log(resApi);
            this.usuarios=resApi


            },
            error:(error: any)=> {

            }
        })


      }



    currentSection: string = 'productos';
  changeSection(section: string) {
    this.currentSection = section;
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
    //   USUARIOS
    // ngOnInit (){
    //         // if (sessionStorage.getItem('info')== undefined||null){
    //         //     this.router.navigate(['login'])
    //         // }

    //         // this.userService.traerUsuarios().subscribe({
    //         //     next:(resApi: any)=> {
    //         //         console.log(resApi);
    //         //     this.usuarios=resApi


    //         //     },
    //         //     error:(error: any)=> {

    //         //     }
    //         // })
    //     }
        eliminarU (id: string){
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
                    this.userService.eliminarUsuario(id).subscribe({
                        next:(resApi: any)=> {
                        this.ngOnInit()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                        },
                        error:(error: any)=> {

                        }

                    })

                }
              });

        }

        actualizar (id:string){
            this.userService.actualizarUsuario(id, this.formEdit.value).subscribe({
                next:(resApi: any)=> {
                    console.log(this.formEdit.value);

                   alert("editado");

                },
                error:(error: any)=> {
                    console.log(error);

                }


            })
        }
        obtenerUnUsuario (id: string) {
            return this.userService.obtenerUnUsuario(id).subscribe({
                next:(resApi: any)=> {
                    console.log("usuario obtenido");
                    this.formEdit.setValue({
                        nombre:resApi.nombre,
                        apellido:resApi.apellido,
                        email:resApi.email,
                        imagen:resApi.imagen
                    })



                },
                error:(error: any)=> {
                    console.log(error);

                }
            })
        }
  }


