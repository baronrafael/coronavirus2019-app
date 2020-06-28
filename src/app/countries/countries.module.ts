import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from '@app/countries/components/countries/countries.component';
import { SharedModule } from '@shared/shared.module';
import { CountriesRoutingModule } from '@app/countries/countries-routing.module';
import { CountryComponent } from './components/country/country.component';
import { CountryResolver } from '@app/countries/resolvers/country.resolver';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [CountriesComponent, CountryComponent],
  imports: [
    CommonModule,
    SharedModule,
    CountriesRoutingModule,
    NgApexchartsModule,
    MatTooltipModule,
  ],
  providers: [CountryResolver],
})
export class CountriesModule {}
