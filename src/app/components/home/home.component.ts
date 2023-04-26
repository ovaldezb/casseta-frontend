import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ServiciosService]
})
export class HomeComponent implements OnInit {
  public qrCode : string="";
  constructor(private _router: Router, private _servicioService:ServiciosService) { }

  ngOnInit(): void {
    this.qrCode = '';
  }

  enviarCodigo(){
    let qrPayload = {
      payload : this.qrCode
    };
    console.log(qrPayload);
    this._servicioService.sendQrData(JSON.stringify(qrPayload))
        .subscribe(res => {
          if(res.status ==='success'){
            console.log(res);
            this._router.navigateByUrl('/resultado',{state:res});
          }else{
            Swal.fire({
              title:'QR no válido',
              text:'Error al leer el Código QR',
              icon:'error',
              confirmButtonText:'Descartar'
            });
          }
        });
  }

}
