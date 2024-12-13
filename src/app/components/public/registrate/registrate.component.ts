import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrate',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './registrate.component.html',
  styleUrl: './registrate.component.css'
})
export class RegistrateComponent {
    userService = inject(UsuarioService)
    formRegister!: FormGroup
    constructor(private fb : FormBuilder, private router : Router){
        this.formRegister = this.fb.group({
          nombre: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          imagen: ['',[]]
        });
      }

// ngOnInit(){
    // if (sessionStorage.getItem('token') == undefined || null) {
    //     this.router.navigate(['login'])
    // }
// }

    register (){
        console.log(this.formRegister.value);

        this.userService.crearUsuario(this.formRegister.value).subscribe({
            next:(resApi: any)=>{
                alert("producto creado mi bro")
                Swal.fire({
                    icon:"success",
                    title:"welcome manito",
                    text:`"{error}`
                })

            },
            error:(error: any)=>{
                console.log(error);
                Swal.fire({
                    icon:"error",
                    title:"usuario no registrado",
                    text:`"{error}`
            })


            }

    })
    }

}

