import { Injectable } from "@angular/core";
import { PedidoService } from 'src/app/services/pedido.service';

export const TipoPago = {
    EFECTIVO: 'EFECTIVO',
    TARJETA: 'TARJETA'
}

export class FormaPago {
    private _tipo: string;
    private _monto?: number | undefined;
    private _nombre?: string | undefined;
    private _numeroTarjeta?: string | undefined;
    private _vencimiento?: Date | undefined;
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
    public get vencimiento(): Date | undefined {
        return this._vencimiento;
    }
    public set vencimiento(value: Date | undefined) {
        this._vencimiento = value;
    }


    public get CVV(): number | undefined {
        return this._CVV;
    }
    public set CVV(value: number | undefined) {
        this._CVV = value;
    }

    constructor(tipo: string, monto?: number | undefined, nombre?: string | undefined, numeroTarjeta?: string | undefined, vencimiento?: Date | undefined, CVV?: number | undefined) {
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
        if (this.formaActual != undefined) {
            return this.formaActual.tipo;
          }
        return}

// fin de zona completamente hardcodeada y añadida de la manera menos aceptable posible, funciona, no conozco otra manera
    
}