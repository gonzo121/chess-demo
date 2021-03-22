import { TtUsuario } from "./ttusuario";

export class Response{
    response : { 
        dsUsuariosDemo: { 
            ttusuarios: Array<TtUsuario> 
        }, 
        pcErr: string 
    }
}