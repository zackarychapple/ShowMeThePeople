import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {NxModule} from '@nrwl/nx';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PeopleService} from "./people.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: HomeComponent}
    ], {initialNavigation: 'enabled'}),
    HttpClientModule
  ],
  providers: [PeopleService],
  declarations: [AppComponent, HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
