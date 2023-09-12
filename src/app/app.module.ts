import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';  
import {MatIconModule} from '@angular/material/icon'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { TipoDePedidosComponent } from './components/tipo-de-pedidos/tipo-de-pedidos.component';
import { PedidoNoAdheridoComponent } from './components/pedido-no-adherido/pedido-no-adherido.component';
import { PagoComponent } from './components/pago/pago.component';
import { FormsModule } from '@angular/forms';
import { Servicios } from './services';
import { Componentes } from './components';
import { DetallesPedidoComponent } from './components/detalles-pedido/detalles-pedido.component';
import { PedidoConfirmadoComponent } from './components/pedido-confirmado/pedido-confirmado.component';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
  declarations: [
    AppComponent,
    ...Componentes
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    MatTabsModule,
    MatSnackBarModule,
    NgxMatNativeDateModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    MatTooltipModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'tipo-de-pedido', component: TipoDePedidosComponent},
      {path: 'pedido-no-adherido', component: PedidoNoAdheridoComponent},
      {path: 'pago', component: PagoComponent},
      {path: 'detalles-pedido', component: DetallesPedidoComponent},
      {path: 'pedido-confirmado', component: PedidoConfirmadoComponent},
      {path: '', redirectTo: '/login', pathMatch: 'full'},
    ]),
  ],
  providers: [...Servicios ],
  bootstrap: [AppComponent]
})
export class AppModule { }
