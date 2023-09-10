import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent {
  constructor(private pedidoService: PedidoService, private router: Router){}
  navigateTo(route: string[]) {
    this.router.navigate(route);
  }
}
