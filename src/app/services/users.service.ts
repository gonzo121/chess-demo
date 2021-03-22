import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { API } from '../config/APIs';
import { TtUsuario } from '../model/ttusuario';
import { ChessUserListResponse } from '../model/chess-user-list-response';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url
   }

   public obtenerUsuarios() : Promise<ChessUserListResponse> {
     let url = `${this.url}${API.DEMO_USUARIOS}obtenerUsuarios`
     return this.http.put<ChessUserListResponse>(url, {}).toPromise()
   }

   public gestionarUsuarios(accion: string, ttUsuarios : Array<TtUsuario>) : Promise< { response: { pcErr: string }} >{
    let url = `${this.url}${API.DEMO_USUARIOS}gestionarUsuarios`
    let request = {
      request: { pcaccion: accion, dsUsuariosDemo: { ttusuarios: ttUsuarios} } 
    }
    return this.http.put< { response: { pcErr: string} } >(url, request).toPromise()
   }


}
