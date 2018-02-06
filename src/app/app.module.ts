import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, Routes} from '@angular/router';
import { WebService } from './services/web.service';
import { GroupService } from './services/group.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GroupComponent } from './group/group.component';
import {  FormBuilder } from "@angular/forms";
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';

const ROUTES = [
  {path: '' , redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent}, 
  {path: 'admin', component: GroupComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBJC0apf3_BgbDffq-XzpOqehwujK9sFho', libraries: ['geometry', 'places']}),
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [FormBuilder, WebService, GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
