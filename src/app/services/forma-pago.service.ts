import { Injectable } from "@angular/core";
import { PedidoService } from 'src/app/services/pedido.service';

export enum TipoPago {
    'EFECTIVO',
    'TARJETA',
}

export class FormaPago {
    private _tipo: string;
    private _monto?: number | undefined;
    private _nombre?: string | undefined;
    private _numeroTarjeta?: string | undefined;
    private _vencimiento?: string | undefined;
    private _CVV?: number | undefined;

    public get tipo(): string {
        return this._tipo;
    }
    public set tipo(value: string) {
        this._tipo = value;
    }
    public get monto(): number | undefined{
        return this._monto;
    }
    public set monto(value: number | undefined) {
        this._monto = value;
    }
    public get nombre(): string | undefined {
        return this._nombre;
    }
    public set nombre(value: string | undefined) {
        this._nombre = value;
    }
    public get numeroTarjeta(): string | undefined {
        return this._numeroTarjeta;
    }
    public set numeroTarjeta(value: string | undefined) {
        this._numeroTarjeta = value;
    }
    public get vencimiento(): string | undefined {
        return this._vencimiento;
    }
    public set vencimiento(value: string | undefined) {
        this._vencimiento = value;
    }


    public get CVV(): number | undefined {
        return this._CVV;
    }
    public set CVV(value: number | undefined) {
        this._CVV = value;
    }

    constructor(tipo: string, monto?: number | undefined, nombre?: string | undefined, numeroTarjeta?: string | undefined, vencimiento?: string | undefined, CVV?: number | undefined) {
        this._tipo = tipo;
        this._monto = monto
        this._nombre = nombre;
        this._vencimiento = vencimiento;
        this._numeroTarjeta = numeroTarjeta;
        this._CVV = CVV;
    }
}

@Injectable({
    providedIn: 'root',
})
export class FormaPagoService {
    private formaActual?: FormaPago;

    setFormaDePagoActual(formaActual: FormaPago) {
        this.formaActual = formaActual;
        console.info(this.formaActual);
    }

// completamente hardcodeado y añadido de la manera menos aceptable posible, funciona, no conozco otra manera

    getTipo(){
        if (this.formaActual != undefined) return this.formaActual.tipo;
        return
    }
    
    getNroTarjeta() {
        if (this.formaActual != undefined) return this.formaActual.numeroTarjeta?.slice(-4);
        return
    }

    getMontoAbonado(){
        if (this.formaActual != undefined) return this.formaActual.monto;
        return
    }

// fin de zona completamente hardcodeada y añadida de la manera menos aceptable posible, funciona, no conozco otra manera
    
}