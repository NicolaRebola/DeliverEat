import { Injectable } from "@angular/core";
import { Usuarios } from '../mock/index';
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root',
})

export class LoginService {
    constructor(private cookiesService: CookieService) {}

    login(usuario: string, contraseña: string): boolean {
        const usuarioLogueado = Usuarios.filter((_usuario) => _usuario.usuario === usuario && _usuario.contraseña === contraseña);
        if (usuarioLogueado.length) {
            this.cookiesService.set('usuarioLogueado', JSON.stringify(usuarioLogueado));
            return true;
        }
        return false;
    }

    hayUsuarioLogueado() {
        try {
            const usuarioLogueado = JSON.parse(this.cookiesService.get('usuarioLogueado'));
            return true;
        } catch(err) {
            return false;
        }
    }
}
