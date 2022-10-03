import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField } from '@angular/material/form-field';

@NgModule({
  declarations: [MatButton, MatFormField, MatInput],
  exports: [MatButton, MatFormField, MatInput],
  imports: [CommonModule],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
      },
    },
  ],
})
export class ComponentsModule {}
