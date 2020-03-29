import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@app/layout/components/layout/layout.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'countries',
        loadChildren: () =>
          import('../countries/countries.module').then(
            (m) => m.CountriesModule,
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
