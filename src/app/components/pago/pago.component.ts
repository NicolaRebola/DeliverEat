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
  number = 0;
  tabindex = 0;

  today = new Date();
  constructor(private snackbar: MatSnackBar, private pedidoService: PedidoService, private formapago: FormaPagoService, private router: Router){
    const fb = new FormBuilder();
    this.formaPagoForm = fb.nonNullable.group({
      tipo: new FormControl("EFECTIVO", { nonNullable: true, 'validators': [Validators.required] }),
      nombre: new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
      numeroTarjeta: new FormControl('', { nonNullable: true, 'validators': [Validators.required, Validators.minLength(16), Validators.maxLength(16)] , }),
      vencimiento: 0,
      cvv:new FormControl('', { nonNullable: true, 'validators': [Validators.required, Validators.minLength(3), Validators.maxLength(4)] }),
  })}
  navigateTo(route: string[]) {
    this.router.navigate(route);
  }
  setFormaPDetails() {
    const { tipo, monto, nombre, numeroTarjeta, vencimiento, cvv } = this.formaPagoForm.value;
    console.log(this.tabindex)
    console.log(this.precio())
    console.log(this.number)
    if (this.number < this.precio() && this.tabindex === 0) {
      this.snackbar.open('Oops! Debe completar al menos un método de pago correctamente.', undefined, { duration: 1000, panelClass: 'error_message' })
      return;
    }
    else if(!this.formaPagoForm.valid && this.tabindex === 1){
      this.snackbar.open('Oops! Debe completar al menos un método de pago correctamente.', undefined, { duration: 1000, panelClass: 'error_message' })
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

  precio():number {
    const total = Number(((Number(this.pedidoService.getDist())/100) * 50).toFixed(2));
    return total
  }
  


}
