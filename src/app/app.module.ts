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
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { TipoDePedidosComponent } from './components/tipo-de-pedidos/tipo-de-pedidos.component';
import { PedidoNoAdheridoComponent } from './components/pedido-no-adherido/pedido-no-adherido.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TipoDePedidosComponent,
    PedidoNoAdheridoComponent
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
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'tipo-de-pedido', component: TipoDePedidosComponent},
      {path: 'pedido-no-adherido', component: PedidoNoAdheridoComponent},
      {path: '', redirectTo: '/login', pathMatch: 'full'},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
