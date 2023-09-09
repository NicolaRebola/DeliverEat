import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipo-de-pedidos',
  templateUrl: './tipo-de-pedidos.component.html',
  styleUrls: ['./tipo-de-pedidos.component.css']
})
export class TipoDePedidosComponent {
  constructor(private router:Router) {}
  selectLugarNoAdherido(){
    this.router.navigate(['pedido-no-adherido'])
  }
}
