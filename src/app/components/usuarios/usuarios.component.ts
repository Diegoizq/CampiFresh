import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    ReactiveFormsModule

  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
userService = inject(UsuarioService)
    formEdit!: FormGroup

    constructor(private fb: FormBuilder, private router : Router){
        this.formEdit=this.fb.group({
            nombre :['', []],
            apellido :['', []],
            email:['', []],
            imagen:['', []]

        })
    }

    usuarios!: any

    ngOnInit (){
        if (sessionStorage.getItem('token')== undefined||null){
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
    eliminar (id: string){
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

