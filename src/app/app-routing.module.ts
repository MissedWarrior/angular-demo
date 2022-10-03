import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from '@/app/signup';
import { SignupSuccessComponent } from '@/app/signup-success';
import { EmailConfirmationComponent } from '@/app/email-confirmation';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signup',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    children: [
      {
        path: '',
        component: SignupComponent,
        pathMatch: 'full',
      },
      {
        path: 'email-confirmation',
        component: EmailConfirmationComponent,
        pathMatch: 'full',
      },
      {
        path: 'success',
        component: SignupSuccessComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
