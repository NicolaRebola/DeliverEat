import { Injectable } from "@angular/core";

export const TipoPedido = {
    LO_QUE_SEA: 'LO_QUE_SEA',
    COMERCIO_ADHERIDO: 'COMERCIO_ADHERIDO'
}

export class Pedido {
    private _tipo: string;
    private _descripcionProducto: string;
    private _imagen?: File | undefined;
    private _ciudad: string;
    private _direccionRetiro: string;
    private _direccionEntrega: string;

    public get tipo(): string {
        return this._tipo;
    }
    public set tipo(value: string) {
        this._tipo = value;
    }
    public get descripcionProducto(): string {
        return this._descripcionProducto;
    }
    public set descripcionProducto(value: string) {
        this._descripcionProducto = value;
    }
    public get imagen(): File | undefined {
        return this._imagen;
    }
    public set imagen(value: File | undefined) {
        this._imagen = value;
    }
    public get ciudad(): string {
        return this._ciudad;
    }
    public set ciudad(value: string) {
        this._ciudad = value;
    }
    public get direccionRetiro(): string {
        return this._direccionRetiro;
    }
    public set direccionRetiro(value: string) {
        this._direccionRetiro = value;
    }
    public get direccionEntrega(): string {
        return this._direccionEntrega;
    }
    public set direccionEntrega(value: string) {
        this._direccionEntrega = value;
    }

    constructor(tipo: string, descripcionProducto: string, ciudad: string, direccionRetiro: string, direccionEntrega: string, imagen?: File) {
        this._tipo = tipo;
        this._descripcionProducto = descripcionProducto;
        this._ciudad = ciudad;
        this._direccionEntrega = direccionEntrega;
        this._direccionRetiro = direccionRetiro;
        this._imagen = imagen;
    }
}

@Injectable({
    providedIn: 'root',
})
export class PedidoService {
    private pedidoActual?: Pedido;
    validarImagen(imagen: File) {
        if (imagen.size > (5 * 1000000)) throw new Error('Oops! La imagen debe pesar menos de 5MB. Vuelve a intentar!');
        if (imagen.type !== 'image/jpg') throw new Error('Oops! La imagen debe ser JPG. Vuelve a intentar!');
        return true;
    }

    setPedidoActual(pedidoActual: Pedido) {
        this.pedidoActual = pedidoActual;
        console.info(this.pedidoActual);
    }
}