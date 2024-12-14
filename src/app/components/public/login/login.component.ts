import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    userService= inject(UsuarioService)
    formLogin!: FormGroup
    constructor(private fb: FormBuilder, private router : Router){

        this.formLogin=this.fb.group({
            email:['',[Validators.required, Validators.email]],
            password:['',[Validators.required, Validators.minLength(3)]]

        })
    }

    // desecriptarToken(){
    //     if (sessionStorage.getItem('token'))
    //         this.userService.desencriptarToken().subscribe({
    //             next:(resApi:any)=>{
    //                 sessionStorage.setItem('roll', resApi.roll)
    //             },
    //             error:(error:any)=>{
    //                 console.log(error);

    //             }
    //         })
    // }

    login(){


        if (this.formLogin.valid) {
            this.userService.iniciarSesion(this.formLogin.value).subscribe({
                next:(resApi: any)=>{
                    let token= resApi

                    console.log(resApi);
                // sessionStorage.setItem('token', token)
                const info = { token: resApi.token, roll: resApi.user };
                sessionStorage.setItem("info", JSON.stringify(info));
               

                // this.desecriptarToken()
            Swal.fire({
                title: "ingresado!",
                        text: "clave correcta.",
                        icon: "success"


                        })

                },
                error:(error: any)=>{

                    Swal.fire({
                        title: "can not login!",
                            text: "Ingreso denegado",
                            icon:"error"



                    })
                    // this.desecriptarToken()
                    console.log(error);


                }
            })
        } else {
           alert("formulario invalido")
           Swal.fire({
            title: "no es posible inicar sesion!",
            text: "no es posible inicar sesion!",
            icon: "error"
        })


        }
    }
}
