import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  constructor(private pedidoService: PedidoService, private router: Router){}
  navigateTo(route: string[]) {
    this.router.navigate(route);
  }

  setPagoDetails(){
    this.navigateTo(['detalles-pedido'])
  }
}
