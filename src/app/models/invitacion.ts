export class Invitacion{
  constructor(
    public _id:string,
    public anfitrion: string,
    public asunto: string,
    public duracion: Number,
    public nombreInvitado: string,
    public telefonoInvitado: string,
    public correoInvitado: string,
    public fechaEvento: string,
    public horaEvento: string,
    public detalle: string,
    public lugar: string,
    public notificarEntrada: boolean,
    public placas: string,
    public tarjeton: string,
    public horaIngreso: Date,
    public dejaId: boolean,
    public sincronizado: boolean,
    public esRecurrente: boolean,
    public numRepeticiones: number
  ){}
}