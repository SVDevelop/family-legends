import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {ErrorStateMatcher, MAT_DATE_LOCALE, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppMaterialModule } from './app-material/app-material.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { forRoot as forRootReducers,  metaReducers } from './store';
import { forRoot as forRootEffects } from './effects';

import { AppComponent } from './app.component';
// import { environment } from '../environments/environment';
import { AuthComponent } from './auth/auth.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {httpInterceptorProviders} from "./interceptors";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TopMenuComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    AppMaterialModule,
    // StoreModule.forRoot({}, {}),
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    // EffectsModule.forRoot([])
    EffectsModule.forRoot(forRootEffects)
    , StoreModule.forRoot(forRootReducers, {metaReducers})
    , StoreDevtoolsModule.instrument({maxAge: 30}),


    AppRoutingModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
