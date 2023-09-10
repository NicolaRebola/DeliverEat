import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    if (this.loginService.hayUsuarioLogueado()) this.navegarHome();
  }

  login() {
    if (this.loginForm.invalid) return;
    const usuario = this.loginForm.value.username ? this.loginForm.value.username : '';
    const contraseña = this.loginForm.value.password ? this.loginForm.value.password : '';
    if (this.loginService.login(usuario, contraseña)) this.navegarHome();
  }

  navegarHome() {
    this.router.navigate(['tipo-de-pedido'])
  }
}
