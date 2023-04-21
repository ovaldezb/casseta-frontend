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

  ngOnInit(): void {
    let invitacionState = history.state;
    this.invitacion = invitacionState.invitacion;
    
    this.fechaEventoParsed = new Date(this.invitacion.fechaEvento.toString()+' '+this.invitacion.horaEvento);
    let fechaActual = new Date();
    this.isEventValid = true;
        return;
    if(fechaActual.getTime() >= this.fechaEventoParsed.getTime()){
      if(fechaActual.getDate()===this.fechaEventoParsed.getDate() && fechaActual.getMonth()===this.fechaEventoParsed.getMonth()){
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

  guardarInvitacion():void{
    this.invitacion.horaIngreso = new Date();
    this.invitacion.sincronizado = false;
    this._servicioService.guardarInvitacion(this.invitacion)
        .subscribe(res=>{
          Swal.fire({
            title:'Invitación Exitosa',
            html:'La invitación se guardó de manera exitosa',
            timer:2000,
            timerProgressBar:true
          });
          this.closeModal();
          this.invitacion = new Invitacion('','','',0,'','','','','','','',false,'','',new Date(),false,false, false, 0);
          this._router.navigateByUrl('/');
        });
  }

  backHome():void{
    this._router.navigateByUrl('/');
  }

  closeModal():void{
    this.isEventValid = false;
  }

}
