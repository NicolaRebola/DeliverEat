import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ciudades } from 'src/app/mock/Ciudades.mock';
import { Direccion, Pedido, PedidoService, TipoPedido } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido-no-adherido',
  templateUrl: './pedido-no-adherido.component.html',
  styleUrls: ['./pedido-no-adherido.component.css']
})

export class PedidoNoAdheridoComponent {
  file?: File;
  ciudades = Ciudades;
  pedidoForm: FormGroup;

  constructor(private snackbar: MatSnackBar, private pedidoService: PedidoService, private router: Router) {
    const fb = new FormBuilder();
    this.pedidoForm = fb.nonNullable.group({
      ciudad: new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
      producto: new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
      calleRetiro: new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
      nroRetiro: new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
      referenciaRetiro: new FormControl('', { nonNullable: true }),
      calleEntrega: new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
      nroEntrega: new FormControl('', { nonNullable: true, 'validators': [Validators.required] }),
      referenciaEntrega: new FormControl('', { nonNullable: true }),
      distancia: 0,
    })
  }

  setPedidoDetails() {
    if (!this.pedidoForm.valid) {
      this.snackbar.open('Oops! Todos los campos son obligatorios.', undefined, { duration: 1000, panelClass: 'error_message' })
      return;
    }
    const { ciudad, producto, calleRetiro, nroRetiro, referenciaRetiro, calleEntrega, nroEntrega, referenciaEntrega, distancia }  = this.pedidoForm.value;
    const direccionEntrega = new Direccion(calleEntrega, ciudad, nroEntrega, referenciaEntrega);
    const direccionRetiro = new Direccion(calleRetiro, ciudad, nroRetiro, referenciaRetiro);
    this.pedidoService.setPedidoActual(new Pedido(TipoPedido.LO_QUE_SEA, producto, ciudad, direccionRetiro, direccionEntrega, distancia, this.file));
    this.navigateTo(['pago'])
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

  navigateTo(route: string[]) {
    this.router.navigate(route);
  }
}
