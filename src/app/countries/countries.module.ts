import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CountriesComponent } from '@app/countries/components/countries/countries.component';
import { SharedModule } from '@shared/shared.module';
import { CountriesRoutingModule } from '@app/countries/countries-routing.module';
import { CountryComponent } from './components/country/country.component';
import { CountryResolver } from '@app/countries/resolvers/country.resolver';

@NgModule({
  declarations: [CountriesComponent, CountryComponent],
  imports: [
    CommonModule,
    SharedModule,
    CountriesRoutingModule,
    MatTooltipModule,
    MatCheckboxModule,
  ],
  providers: [CountryResolver],
})
export class CountriesModule {}
