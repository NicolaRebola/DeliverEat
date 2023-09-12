import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';
import { FormaPagoService, FormaPago, TipoPago } from 'src/app/services/forma-pago.service';

@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent {
  constructor(private pedidoService: PedidoService, private formaPagoService: FormaPagoService, private router: Router){}
  navigateTo(route: string[]) {
    this.router.navigate(route);
  }
  distancia() {
    const dist = this.pedidoService.getDist();
    return dist
  }
  precio() {
    const total = ((Number(this.pedidoService.getDist())/100) * 50).toFixed(2);
    return total
  }

  // manera no convencional de mostrar los datos 
  descripcion() {
    return this.pedidoService.getDescrP();
  }
  ciudad() {
    return this.pedidoService.getCiudad();
  }
  destino() {
    return this.pedidoService.getDomDestino();
  }
  origen() {
    return this.pedidoService.getDomOrigen();
  }
  referenciaDestino() {
    return this.pedidoService.getDomDestino();
  }
  referenciaOrigen() {
    return this.pedidoService.getDomOrigen();
  }
  tipoPago() {
    return this.formaPagoService.getTipo();
  }

  nroTarjeta() {
    return this.formaPagoService.getNroTarjeta();
  }

  montoAbonado() {
    return this.formaPagoService.getMontoAbonado();
  }
  // fin de manera no convencional de mostrar los datos 
}
