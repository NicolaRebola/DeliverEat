import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ciudades } from 'src/app/mock/Ciudades.mock';

@Component({
  selector: 'app-pedido-no-adherido',
  templateUrl: './pedido-no-adherido.component.html',
  styleUrls: ['./pedido-no-adherido.component.css']
})

export class PedidoNoAdheridoComponent {
  ciudades = Ciudades;
  pedidoForm = new FormGroup({
    ciudadEntrega: new FormControl('', [Validators.required]),
    direccionEntrega: new FormControl('', [Validators.required]),
    producto: new FormControl('', [Validators.required]),
    foto: new FormControl(''),
    direcccionRetiro: new FormControl('', [Validators.required]),
  });

  setPedidoDetails(){

  }
}
