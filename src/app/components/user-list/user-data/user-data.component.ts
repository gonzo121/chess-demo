import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TtUsuario } from 'src/app/model/ttusuario';
import { DeleteUserComponent } from './delete-user/delete-user.component';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  isInvite: boolean = true;

  public userForm = this._formBuilder.group({
    nrousu: new FormControl("", Validators.required),
    usuario: new FormControl("", Validators.required),
    activo: new FormControl("", Validators.required),
    clave: new FormControl("", Validators.required),
    nombre: new FormControl(""),
    apellido: new FormControl(""),
    email: new FormControl("", Validators.required),
    direccion: new FormControl(""),
    telefono: new FormControl(""),
    imagen64: new FormControl("")
  })

  constructor(
    private _formBuilder: FormBuilder,
    private _usersService: UsersService,
    private _dialogRef: MatDialogRef<UserDataComponent>,
    private _snackBar: MatSnackBar,
    private _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) {
    if(data){
      this.isInvite = false;
      for (const key of Object.keys(data)) {
        this.userForm.controls[key].setValue(data[key])
      }
      if(data.imagen64) {
        this.cardImageBase64 = data.imagen64;
        this.isImageSaved = true;
      }
    }
  }

  ngOnInit() {
    console.log(this.userForm)
  }


  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
          this.imageError =
              'Maximo tamaño permitido:' + max_size / 1000 + 'Mb';

          return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
          this.imageError = 'Solo se permiten imagenes ( JPG | PNG )';
          return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
              const img_height = rs.currentTarget['height'];
              const img_width = rs.currentTarget['width'];

              console.log(img_height, img_width);


              if (img_height > max_height && img_width > max_width) {
                  this.imageError =
                      'Dimensión máxima soportada ' +
                      max_height +
                      '*' +
                      max_width +
                      'px';
                  return false;
              } else {
                  const imgBase64Path = e.target.result;
                  this.userForm.controls.imagen64.setValue(imgBase64Path);
                  this.cardImageBase64 = imgBase64Path;
                  this.isImageSaved = true;
              }
          };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }

  public updateUser(){
    let userArray : Array<TtUsuario> = []
    userArray.push(this.userForm.value)
    this._usersService.gestionarUsuarios("update", userArray).then(res => {
      if(res && res.response.pcErr) this.openSnackBar(res.response.pcErr, "cerrar");
      else this._dialogRef.close(res);
    })
  }

  public createUser(){
    let userArray : Array<TtUsuario> = []
    userArray.push(this.userForm.value)
    this._usersService.gestionarUsuarios("create", userArray).then(res => {
      if(res && res.response.pcErr) this.openSnackBar(res.response.pcErr, "cerrar");
      else this._dialogRef.close(res);
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public openDeleteUserDialog(){
    let dialogRef = this._matDialog.open(DeleteUserComponent, {
      width: "30vw",
      height: "fit-content",
      data: this.userForm.value      
    })
    dialogRef.afterClosed().subscribe(res => {
      this._dialogRef.close(res)
    })
  }

  public showButtonLabel(): string{
    return this.isInvite? "Crear" : "Actualizar"
  }

  public functionToDo() {
    return this.isInvite? this.createUser() : this.updateUser()
  }
}
