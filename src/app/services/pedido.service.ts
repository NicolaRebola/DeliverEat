import { Injectable } from "@angular/core";

export const TipoPedido = {
    LO_QUE_SEA: 'LO_QUE_SEA',
    COMERCIO_ADHERIDO: 'COMERCIO_ADHERIDO'
}

export class Direccion {
    private _ciudad: string;
    private _calle: string;
    private _nro: string;
    private _referencia: string;
    public get calle(): string {
        return this._calle;
    }
    public set calle(value: string) {
        this._calle = value;
    }
    public get ciudad(): string {
        return this._ciudad;
    }
    public set ciudad(value: string) {
        this._ciudad = value;
    }
    public get nro(): string {
        return this._nro;
    }
    public set nro(value: string) {
        this._nro = value;
    }
    public get referencia(): string {
        return this._referencia;
    }
    public set referencia(value: string) {
        this._referencia = value;
    }

    constructor(calle: string, ciudad: string, nro: string, referencia: string) {
        this._calle = calle;
        this._ciudad = ciudad;
        this._nro = nro;
        this._referencia = referencia;
    }
}

export class Pedido {
    private _formaEntrega: string;
    public get formaEntrega(): string {
        return this._formaEntrega;
    }
    public set formaEntrega(value: string) {
        this._formaEntrega = value;
    }
    private _tipo: string;
    private _descripcionProducto: string;
    private _imagen?: File | undefined;
    private _ciudad: string;
    private _direccionRetiro: Direccion;
    private _direccionEntrega: Direccion;
    private _distancia?: number | undefined;

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
    public get direccionRetiro(): Direccion {
        return this._direccionRetiro;
    }
    public set direccionRetiro(value: Direccion) {
        this._direccionRetiro = value;
    }
    public get direccionEntrega(): Direccion {
        return this._direccionEntrega;
    }
    public set direccionEntrega(value: Direccion) {
        this._direccionEntrega = value;
    }

    public set distancia(value: number | undefined) {
        this._distancia = value;
    }
    public get distancia(): number | undefined {
        return this._distancia;
    }

    constructor(formaEntrega: string, tipo: string, descripcionProducto: string, ciudad: string, direccionRetiro: Direccion, direccionEntrega: Direccion, distancia?: number, imagen?: File) {
        this._formaEntrega = formaEntrega;
        this._tipo = tipo;
        this._descripcionProducto = descripcionProducto;
        this._ciudad = ciudad;
        this._direccionEntrega = direccionEntrega;
        this._direccionRetiro = direccionRetiro;
        this._imagen = imagen;
        this._distancia = distancia;
    }
}

@Injectable({
    providedIn: 'root',
})
export class PedidoService {
    private pedidoActual?: Pedido;
    validarImagen(imagen: File) {
        if (imagen.size > (5 * 1000000)) throw new Error('Oops! La imagen debe pesar menos de 5MB. Vuelve a intentar!');
        if (imagen.type !== 'image/jpg' && imagen.type !== 'image/jpeg') throw new Error('Oops! La imagen debe ser JPG. Vuelve a intentar!');
        return true;
    }
    setPedidoActual(pedidoActual: Pedido) {
        this.pedidoActual = pedidoActual;
        console.info(this.pedidoActual);
    }
    getPedidoActual(): Pedido | undefined {
        return this.pedidoActual;
    }
// completamente hardcodeado y añadido de la manera menos aceptable posible, funciona, no conozco otra manera
    setDist(c: number){
        if (this.pedidoActual != undefined) {
            this.pedidoActual.distancia = c;
        }   
    }
    getDist(){
        if (this.pedidoActual != undefined) {
            return this.pedidoActual.distancia;
          }
        return 0}
    getDescrP(){
        if (this.pedidoActual != undefined) {
            return this.pedidoActual.descripcionProducto;
          }
        return
    }
    getCiudad(){
        if (this.pedidoActual != undefined) {
            return this.pedidoActual.direccionEntrega.ciudad;
          }
        return
    }
    getDomDestino(){
        if (this.pedidoActual != undefined) 
            return `${this.pedidoActual.direccionEntrega.calle} ${this.pedidoActual.direccionEntrega.nro}`;
        return
    }
    getDomOrigen(){
        if (this.pedidoActual != undefined) 
            return `${this.pedidoActual.direccionRetiro.calle} ${this.pedidoActual.direccionRetiro.nro}`;
        return
    }
    getRefOrigen(){
        if (this.pedidoActual != undefined) return this.pedidoActual.direccionRetiro.referencia;
        return
    }
    getRefDestino(){
        if (this.pedidoActual != undefined) return this.pedidoActual.direccionEntrega.referencia;
        return
    }
    // fin de zona completamente hardcodeada y añadida de la manera menos aceptable posible, funciona, no conozco otra manera
    validarMontoEfectivo(monto: number) {
        if (this.pedidoActual?.distancia != undefined) {
            if (monto < ((this.pedidoActual.distancia/100)*50)) throw new Error('Oops! El monto debe ser mayor o igual al total a pagar. Vuelve a intentar!');
          }
        return true;
    }
}