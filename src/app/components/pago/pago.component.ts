import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  number? = Number;
  constructor(private snackbar: MatSnackBar, private pedidoService: PedidoService, private router: Router){}
  navigateTo(route: string[]) {
    this.router.navigate(route);
  }
  dist = 0;

  ngOnInit(): void {
  }

  setPagoDetails(){
    this.navigateTo(['detalles-pedido'])
  }
  //Num mayor o igual que 100 y menor que 100000
  envio() {
    if (this.pedidoService.getDist() == 0) {
      const d = Math.random() * (100000 - 100) + 100;
      this.pedidoService.setDist(Number(d.toFixed(2)));
    }
    return this.pedidoService.getDist();
  }

  precio() {
    const total = ((Number(this.pedidoService.getDist())/100) * 50).toFixed(2);
    return total
  }
  
  onEfectCharged(event: any): void {
    const val = event.value;
    try {
      this.pedidoService.validarMontoEfectivo(val);
      this.number = val;
    } catch(err: any) {
      this.snackbar.open(err.message, undefined, { duration: 1000, panelClass: 'error_message' })
    }
}}
