import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-confirmado',
  templateUrl: './pedido-confirmado.component.html',
  styleUrls: ['./pedido-confirmado.component.css']
})
export class PedidoConfirmadoComponent implements OnInit {
  constructor(private router: Router) {}
  
  ngOnInit(): void {
    // 5 seg después, navegar a nuevo pedido
    setTimeout(() => this.router.navigate(['tipo-de-pedido']), (1000*5));
  }

}
