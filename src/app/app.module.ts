import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ApiModule } from '@/api/api.module';
import { ComponentsModule } from '@/components/components.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignupComponent } from './signup';
import { EmailConfirmationComponent } from './email-confirmation';
import { SignupSuccessComponent } from './signup-success';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    EmailConfirmationComponent,
    SignupSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApiModule,
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
