import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pedido, PedidoService } from 'src/app/services/pedido.service';
import { FormaPagoService, FormaPago, TipoPago } from 'src/app/services/forma-pago.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
  
})

export class PagoComponent implements OnInit {
  formaPagoForm: FormGroup;
  number = 0;
  tabindex = 0;
  pedidoActual?: Pedido;
  today = new Date();

  constructor(private snackbar: MatSnackBar, private pedidoService: PedidoService, private formapago: FormaPagoService, private router: Router){
    const fb = new FormBuilder();
    this.formaPagoForm = fb.nonNullable.group({
      nombre: new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
      numeroTarjeta: new FormControl('', { nonNullable: true, 'validators': [Validators.required, Validators.minLength(16), Validators.maxLength(16)] , }),
      año_vencimiento: new FormControl('23', { nonNullable: true, 'validators': [Validators.required, Validators.minLength(2), Validators.maxLength(2)]}),
      mes_vencimiento: new FormControl('09', { nonNullable: true, 'validators': [Validators.required, Validators.minLength(2), Validators.maxLength(2)]}),
      cvc:new FormControl('', { nonNullable: true, 'validators': [Validators.required, Validators.min(0), Validators.max(999)] }),
    });  
  }

  navigateTo(route: string[]) {
    this.router.navigate(route);
  }
  setFormaPDetails() {
    const { monto, nombre, numeroTarjeta, año_vencimiento, mes_vencimiento, cvc } = this.formaPagoForm.value;
    if (this.tabindex === 0 && this.number < this.precio()) {
      this.snackbar.open('Oops! El monto a ingresar debe ser mayor o igual al Total.', undefined, { duration: 1000, panelClass: 'error_message' })
      return;
    }
    else if (this.tabindex === 1 && (!this.formaPagoForm.valid || this.esTarjetaVencida(mes_vencimiento, año_vencimiento))){
      this.snackbar.open('Oops! Verifique los datos en al tarjeta.', undefined, { duration: 1000, panelClass: 'error_message' })
      return;
    }

    const vencimiento: string = `${mes_vencimiento}/${año_vencimiento}`;
    const tipo = TipoPago[this.tabindex];
    console.info(tipo);
    this.formapago.setFormaDePagoActual(new FormaPago(tipo, monto, nombre, numeroTarjeta, vencimiento, cvc));
    this.navigateTo(['detalles-pedido'])
  }

  esTarjetaVencida(mes: string, año: string): boolean {
    return año < '23' || (año === '23' && mes < '09');
  }

  ngOnInit(): void {
    this.pedidoActual = this.pedidoService.getPedidoActual();
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

  precio():number {
    const total = Number(((Number(this.pedidoService.getDist())/100) * 50).toFixed(2));
    return total
  }

  validarNroTarjeta() {
    const nroTarjeta: string = this.formaPagoForm.value.numeroTarjeta;
    if (!this.esTarjetaVisa(nroTarjeta)) {
      this.formaPagoForm.controls['numeroTarjeta'].setErrors({'incorrect': true});
    }
  }

  esTarjetaVisa(nro: string): boolean {
    return Boolean(nro.match(/^4[0-9]{12}(?:[0-9]{3})?$/));
  }

  validarMes() {
    const mes = this.formaPagoForm.value.mes_vencimiento;
    if (!this.esNumero(mes) || !(parseInt(mes) >= 1 && parseInt(mes) <= 12) ) {
      this.formaPagoForm.controls['mes_vencimiento'].setErrors({'incorrect': true});
    }
  }

  validarAnio() {
    const anio = this.formaPagoForm.value.año_vencimiento;
    if (!this.esNumero(anio) || !(parseInt(anio) >= 23 && parseInt(anio) <= 99) ) {
      this.formaPagoForm.controls['año_vencimiento'].setErrors({'incorrect': true});
    }
  }

  validarCvc() {
    const cvc = this.formaPagoForm.value.cvc;
    if (!cvc.match(/([0-9]){3}$/)) {
      this.formaPagoForm.controls['cvc'].setErrors({'incorrect': true});
    }
  }

  esNumero(data: string) {
    return data.match(/([0-9]){2}$/);
  }
}
