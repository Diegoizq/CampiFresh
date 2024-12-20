import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductosService } from '../../services/productos/productos.service';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-productos-admin',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './productos-admin.component.html',
  styleUrl: './productos-admin.component.css'
})
export class ProductosAdminComponent {
products!: any
    pruductosService = inject(ProductosService)
    userService = inject(UsuarioService)
    formProduct!: FormGroup
    fomrEdit!: FormGroup
    usuarios:any[]=[]

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
    ngOnInit(){
        if (sessionStorage.getItem('info') == undefined|| null) {
            this.router.navigate(['login'])
        }
            this.pruductosService.getProductos().subscribe({
                next:(resApi: any)=>{
                    this.products= resApi
                },
                error:(error: any)=>{
                    console.log(error);





                }
            })
            






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
