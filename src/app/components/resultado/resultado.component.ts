import { Component, OnInit } from '@angular/core';
import { Invitacion } from 'src/app/models/invitacion';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css'],
  providers: [ServiciosService]
})
export class ResultadoComponent implements OnInit {
  public invitacion: Invitacion= new Invitacion('','','',0,'','','','','','','',false,'','',new Date(),false,false, false, 0);
  public isEventValid : boolean = false;
  public fechaEventoParsed: Date= new Date();
  constructor(private _router: Router, private _servicioService:ServiciosService) { }

  private meses: String[] = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  private dias: String[] = ['Lunes', 'Martes', 'Miércoles','Jueves','Viernes','Sábado','Domingo'];
  public diaEvento: String = '';
  ngOnInit(): void {
    let invitacionState = history.state;
    this.invitacion = invitacionState.invitacion;
    if(!this.invitacion.esRecurrente){
      this.invitacionNoRecurrente();
    }else{
      this.invitacionRecurrente();
    }
  }

  guardarInvitacion():void{
    Swal.fire({
      title:'Esta seguro que desea registrar ésta entrada?',
        showCancelButton:true,
        confirmButtonText:'OK'
    }).then(resultado=>{
      if(resultado.isConfirmed){
        this.invitacion.horaIngreso = new Date();
        this.invitacion.sincronizado = false;
        this._servicioService.guardarInvitacion(this.invitacion)
        .subscribe(res=>{
          Swal.fire({
            title:'Invitación Exitosa',
            html:'La entrada se registró de manera exitosa!',
            timer:2000,
            timerProgressBar:true
          });
          this.invitacion = new Invitacion('','','',0,'','','','','','','',false,'','',new Date(),false,false, false, 0);
          this.backHome();
        });
      }
    });
  }

  backHome():void{
    this._router.navigateByUrl('/');
  }

  invitacionNoRecurrente():void{
    this.fechaEventoParsed = new Date(this.invitacion.fechaEvento.toString()+' '+this.invitacion.horaEvento);
    let fechaActual = new Date();
    if(fechaActual.getTime() > this.fechaEventoParsed.getTime()){
      if(fechaActual.getDate()===this.fechaEventoParsed.getDate() && fechaActual.getMonth()===this.fechaEventoParsed.getMonth() && fechaActual.getFullYear()===this.fechaEventoParsed.getFullYear()){
        this.isEventValid = true;
        return;
      }
      this.isEventValid = false;
      Swal.fire({
        title:'Error',
        text:'La fecha del evento es anterior al día de hoy, confirmar con el Condomino ',
        icon:'error',
        confirmButtonText:'Ok'
      });
    }else if(fechaActual.getTime() <= this.fechaEventoParsed.getTime()){
      if(fechaActual.getDate() === this.fechaEventoParsed.getDate() && fechaActual.getMonth()===this.fechaEventoParsed.getMonth()){
        this.isEventValid = true;  
        return;
      }
      this.isEventValid = false;
      Swal.fire({
        title:'Error',
        text:'La fecha del evento es posterior al día de hoy, confirmar con el Condomino ',
        icon:'error',
        confirmButtonText:'Ok'
      });
    }
  }

  invitacionRecurrente():void{
    this.fechaEventoParsed = new Date(this.invitacion.fechaEvento);
    const horaArray = this.invitacion.horaEvento.split(':');
    this.fechaEventoParsed.setHours(Number(horaArray[0]));
    this.fechaEventoParsed.setMinutes(Number(horaArray[1]));
    this.diaEvento = this.dias[this,this.fechaEventoParsed.getDay()-1];
    let fechaActual = new Date();
    if(this.fechaEventoParsed.getDay()===fechaActual.getDay()){
      let fechaLimiteInvitacion = new Date(this.fechaEventoParsed.toDateString());
      fechaLimiteInvitacion.setDate(fechaLimiteInvitacion.getDate() + (7 * (this.invitacion.numRepeticiones-1)));
      if((fechaLimiteInvitacion.getTime() >= fechaActual.getTime()) || 
          fechaLimiteInvitacion.getDate() === fechaActual.getDate() && fechaLimiteInvitacion.getMonth() === fechaActual.getMonth() && fechaLimiteInvitacion.getFullYear() === fechaActual.getFullYear()){ //esta dentro del rango
        this.isEventValid = true;  
        return;
      }else{
        this.isEventValid = false;
        Swal.fire({
          title:'Error',
          text:'Esta invitación recurrente ya caducó, la fecha límite fue el:'+fechaLimiteInvitacion.getDate()+' de '+ this.meses[fechaLimiteInvitacion.getMonth()]+' de '+fechaLimiteInvitacion.getFullYear()+', confirmar con el Condomino ',
          icon:'error',
          confirmButtonText:'Ok'
        });
      }
    }else{
      this.isEventValid = false;
      Swal.fire({
        title:'Error',
        text:'El día del evento no corresponde al de la invitación Recurrente, confirmar con el Condomino ',
        icon:'error',
        confirmButtonText:'Ok'
      });
    }
  }

}
