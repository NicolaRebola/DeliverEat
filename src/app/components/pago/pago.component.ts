import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';
import { FormaPagoService, FormaPago, TipoPago } from 'src/app/services/forma-pago.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  formaPagoForm: FormGroup;
  number? = Number;
  constructor(private snackbar: MatSnackBar, private pedidoService: PedidoService, private formapago: FormaPagoService, private router: Router){
    const fb = new FormBuilder();
    this.formaPagoForm = fb.nonNullable.group({
      tipo: new FormControl("EFECTIVO", { nonNullable: true, 'validators': [Validators.required] }),
      monto: new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
      nombre: new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
      numeroTarjeta: new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
      vencimiento: 0,
      cvv:new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
  })}
  navigateTo(route: string[]) {
    this.router.navigate(route);
  }
  setFormaPDetails() {
    let { tipo, monto, nombre, numeroTarjeta, vencimiento, cvv } = this.formaPagoForm.value;
    if (tipo == TipoPago.EFECTIVO) {
      nombre = " ";
      numeroTarjeta = 0;
      vencimiento = " ";
      cvv = 0;
    }
    if (tipo == TipoPago.TARJETA) {
      monto = 0;
    }
    if (!this.formaPagoForm.valid) {
      this.snackbar.open('Oops! Todos los campos son obligatorios.', undefined, { duration: 1000, panelClass: 'error_message' })
      return;
    }
    
    this.formapago.setFormaDePagoActual(new FormaPago(tipo, monto, nombre, numeroTarjeta, vencimiento, cvv));
    this.navigateTo(['detalles-pedido'])
  }

  ngOnInit(): void {
  }

  setPagoDetails(){
    this.navigateTo(['detalles-pedido'])
  }
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
