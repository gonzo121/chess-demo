import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/model/chess-response';
import { ChessUserListResponse } from 'src/app/model/chess-user-list-response';
import { TtUsuario } from 'src/app/model/ttusuario';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: Array<TtUsuario> = []

  constructor(
    private _usersService : UsersService
  ) {

  }

  ngOnInit() {
    this._loadData();
  }

  private _loadData(){
    this._usersService.obtenerUsuarios().then((res: ChessUserListResponse) => {
      this.userList = res.response.dsUsuariosDemo.ttusuarios

    })
  }

}
