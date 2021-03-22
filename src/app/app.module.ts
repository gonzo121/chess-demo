import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDataComponent } from './components/user-list/user-data/user-data.component';
import { InviteUserComponent } from './components/user-list/invite-user/invite-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDataComponent,
    InviteUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
