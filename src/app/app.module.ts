import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { RepPlaceholderComponent } from './rep-placeholder/rep-placeholder.component';

@NgModule({
  declarations: [
    AppComponent,
    RepPlaceholderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
