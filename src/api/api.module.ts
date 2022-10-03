import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupService } from './signup.service';

@NgModule({
  imports: [CommonModule],
  providers: [SignupService],
})
export class ApiModule {}
