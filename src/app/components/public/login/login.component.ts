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

    ngOnInit(){
        if (sessionStorage.getItem('token'))
            this.router.navigate(['home'])
    }

    login(){
        console.log(this.formLogin.value);
        console.log(this.formLogin.valid);

        if (this.formLogin.valid) {
            this.userService.iniciarSesion(this.formLogin.value).subscribe({
                next:(resApi: any)=>{
                    let token= resApi

                    console.log(resApi);


                sessionStorage.setItem('token', token)
            Swal.fire({
                            title: "can not create!",
                            text: "Your file has not been created.",
                            icon: "error"
                        })
                        this.ngOnInit()
                },
                error:(error: any)=>{

                    Swal.fire({
                        title: "ingresado!",
                        text: "clave correcta.",



                    })
                    console.log(error);


                }
            })
        } else {
           alert("formulario invalido")
           Swal.fire({
            title: "can not create!",
            text: "formulario incorrecto.",
            icon: "error"
        })


        }console.log();
    }
}
