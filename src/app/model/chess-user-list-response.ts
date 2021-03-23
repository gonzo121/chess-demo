import { TtUsuario } from "./ttusuario";

export class ChessUserListResponse{
    response : { 
        dsUsuariosDemo: { 
            ttusuarios: Array<TtUsuario> 
        }, 
        pcErr: string 
    }
}