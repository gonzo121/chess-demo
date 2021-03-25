import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChessUserListResponse } from 'src/app/model/chess-user-list-response';
import { TtUsuario } from 'src/app/model/ttusuario';
import { UsersService } from 'src/app/services/users.service';
import { UserDataComponent } from './user-data/user-data.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: Array<TtUsuario> = [];
  public displayedColumns: string[] = ["nrousu", "usuario", "email", "nombre", "apellido", "activo", "direccion", "telefono"];

  constructor(
    private _usersService : UsersService,
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar,

  ) { 

  }

  ngOnInit() {
    this._loadData();
  }

  private _loadData(){
    this._usersService.obtenerUsuarios().then((res: ChessUserListResponse) => {
      if(res && !res.response.pcErr) this.userList = res.response.dsUsuariosDemo.ttusuarios.sort((a, b) => a.nrousu - b.nrousu);
      else if (res.response.pcErr) this.openSnackBar(res.response.pcErr, "cerrar")
      else this.openSnackBar("Ocurrio un error en el servidor", "cerrar")
    })
  }

  public openUserData(user?: TtUsuario){
    let dialogRef = this._matDialog.open(UserDataComponent, {
      width: "40vw",
      height: "80vh",
      data: user  
    })
    dialogRef.afterClosed().subscribe(data => {
      if(data) this._loadData();
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
