import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '/',
    redirectTo: '/signup',
  },
  {
    path: '/signup',
    children: [
      {
        path: '',
        component: undefined,
        pathMatch: 'full',
      },
      {
        path: 'email-confirm',
        component: undefined,
        pathMatch: 'full',
      },
      {
        path: 'success',
        pathMatch: 'full',
        component: undefined,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
