type Usuario = {
    usuario: string;
    contraseña: string;
    nombre: string;
    apellido: string;
    edad: number;
    rol: 'solicitante';
}

export const Usuarios: Usuario[] = [
    {
        usuario: 'nico@gmail.com',
        contraseña: 'nico123',
        nombre: 'Nicola',
        apellido: 'Rebola',
        edad: 23,
        rol: 'solicitante'
    }
];