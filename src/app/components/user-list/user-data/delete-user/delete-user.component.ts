import { Component, Inject, OnInit } from '@angular/core';
import { TtUsuario } from 'src/app/model/ttusuario';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  private user : TtUsuario;

  constructor(
    private _usersService: UsersService,
    private _dialogRef: MatDialogRef<DeleteUserComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: TtUsuario) {
      this.user = data
    }

  ngOnInit(): void {
  }

  public deleteUser(){
    let userArray : Array<TtUsuario> = []
    userArray.push(this.user)
    this._usersService.gestionarUsuarios("delete", userArray).then(res => {
      if(res && res.response.pcErr) this.openSnackBar(res.response.pcErr, "cerrar");
      else this._dialogRef.close(res);
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public showUser(): string {
    
    return this.user.email? `${this.user.usuario} de email ${this.user.email}` : this.user.usuario;
  }
}
