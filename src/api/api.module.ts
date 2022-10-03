import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationService } from './registration.service';

@NgModule({
  imports: [CommonModule],
  providers: [RegistrationService],
})
export class ApiModule {}
