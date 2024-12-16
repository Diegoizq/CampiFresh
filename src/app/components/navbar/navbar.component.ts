import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    constructor(private router : Router){}
    estado: boolean = false
    roll: boolean = false

ngOnInit (){
    const info = JSON.parse(sessionStorage.getItem('info')||"{}");

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

}
ngDoCheck(){
    this.ngOnInit()
}

logout() {
    sessionStorage.removeItem('info')
    this.router.navigate(['login'])
    this.ngOnInit()
}
}
