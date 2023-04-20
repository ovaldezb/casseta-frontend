import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./global";
import { Invitacion } from "../models/invitacion";

@Injectable()
export class ServiciosService{
  private url: string = '';
  public headers : HttpHeaders = new HttpHeaders().set('Content-Type','application/json');

  constructor(private _http:HttpClient){
    this.url = Global.url;
  }

  sendQrData(qrCode:string):Observable<any>{
    return this._http.post(this.url+'decode',qrCode,{headers:this.headers});
  }

  guardarInvitacion(invitacion:Invitacion):Observable<any>{
    return this._http.post(this.url+'/invitacion',invitacion,{headers:this.headers});
  }
}