import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from '@app/countries/components/countries/countries.component';
import { CountryComponent } from '@app/countries/components/country/country.component';
import { CountryResolver } from '@app/countries/resolvers/country.resolver';

const routes: Routes = [
  {
    path: '',
    component: CountriesComponent,
  },
  {
    path: ':countryName',
    component: CountryComponent,
    resolve: [CountryResolver],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
