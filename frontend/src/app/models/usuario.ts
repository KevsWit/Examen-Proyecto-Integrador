export class Usuario {
  constructor(
    _id: { _id: string } = { _id: '' },
    nombre: string = '',
    ci: string = '',
    correo: string = '',
    usuario: string = '',
    role: string = '',
    psw: string = ''
  ) {
    this._id = _id;
    this.nombre = nombre;
    this.ci = ci;
    this.correo = correo;
    this.usuario = usuario;
    this.role = role;
    this.psw = psw;
  }

  _id: { _id: string }; // Mantenemos la definición como un objeto con la clave $oid
  nombre: string;
  ci: string;
  correo: string;
  usuario: string;
  role: string;
  psw: string;
}
