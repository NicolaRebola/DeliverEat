import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ciudades } from 'src/app/mock/Ciudades.mock';
import { Direccion, Pedido, PedidoService, TipoPedido } from 'src/app/services/pedido.service';
import { NgxMatDatetimepicker } from '@angular-material-components/datetime-picker';

@Component({
  selector: 'app-pedido-no-adherido',
  templateUrl: './pedido-no-adherido.component.html',
  styleUrls: ['./pedido-no-adherido.component.css']
})

export class PedidoNoAdheridoComponent {
  file?: File;
  ciudades = Ciudades;
  pedidoForm: FormGroup;
  pedidoActual?: Pedido;
  today = new Date();

  constructor(private snackbar: MatSnackBar, private pedidoService: PedidoService, private router: Router) {
    const fb = new FormBuilder();
    this.pedidoForm = fb.nonNullable.group({
      formaEntrega: new FormControl('LO_ANTES_POSIBLE', { nonNullable: true, 'validators': [Validators.required] }),
      horaEntrega: new FormControl(this.today),
      ciudad: new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
      producto: new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
      calleRetiro: new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
      nroRetiro: new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
      referenciaRetiro: new FormControl('', { nonNullable: true }),
      calleEntrega: new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
      nroEntrega: new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
      referenciaEntrega: new FormControl('', { nonNullable: true }),
      distancia: 0,
    });
    this.pedidoActual = pedidoService.getPedidoActual();
  }

  setPedidoDetails() {
    if (!this.pedidoForm.valid) {
      this.snackbar.open('Oops! Todos los campos son obligatorios.', undefined, { duration: 1000, panelClass: 'error_message' })
      return;
    }
    const { formaEntrega, ciudad, producto, calleRetiro, nroRetiro, referenciaRetiro, calleEntrega, nroEntrega, referenciaEntrega, distancia }  = this.pedidoForm.value;
    const direccionEntrega = new Direccion(calleEntrega, ciudad, nroEntrega, referenciaEntrega);
    const direccionRetiro = new Direccion(calleRetiro, ciudad, nroRetiro, referenciaRetiro);
    this.pedidoService.setPedidoActual(new Pedido(formaEntrega, TipoPedido.LO_QUE_SEA, producto, ciudad, direccionRetiro, direccionEntrega, distancia, this.file));
    this.navigateTo(['pago'])
  }

  validarAlturaRetiro() {
    const altura = this.pedidoForm.value.nroRetiro;
    if (!altura.match(/([0-9])$/) || !(parseInt(altura) > 0) ) {
      this.pedidoForm.controls['nroRetiro'].setErrors({'incorrect': true});
    }
  }

  validarAlturaEntrega() {
    const altura = this.pedidoForm.value.nroEntrega;
    if (!altura.match(/([0-9])$/) || !(parseInt(altura) > 0) ) {
      this.pedidoForm.controls['nroEntrega'].setErrors({'incorrect': true});
    }
  }

  onImageCharged(event: any): void {
    const file = event.files[0];
    try {
      this.pedidoService.validarImagen(file);
      this.file = file;
    } catch(err: any) {
      this.snackbar.open(err.message, undefined, { duration: 1000, panelClass: 'error_message' })
    }
  }

  showCalendar(picker: NgxMatDatetimepicker<Date>) {
    picker.closedStream.subscribe(() => {
      // today = 12/9/2023 04:20 | defaultDate = 12/09/2023 03:20
      // today - defaultDate < 1hs ==> falla
      const actualDate = new Date();
      const isValid = (this.pedidoForm.value.horaEntrega.getTime() - actualDate.getTime()) / (1000 * 60 * 60) >= 1
      if (this.pedidoForm.value.horaEntrega < actualDate || !isValid) {
        this.snackbar.open('El pedido puede solo programarse para dentro de 1 hs mínimo.', undefined, { duration: 1000, panelClass: 'error_message' });
        this.resetToday();
      }
    })
    picker.open();
  }

  resetToday() {
    this.today = new Date();
    this.today.setHours(this.today.getHours() + 1);
  }

  navigateTo(route: string[]) {
    this.router.navigate(route);
  }
}
