import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from '@app/countries/components/countries/countries.component';
import { SharedModule } from '@shared/shared.module';
import { CountriesRoutingModule } from '@app/countries/countries-routing.module';

@NgModule({
  declarations: [CountriesComponent],
  imports: [CommonModule, SharedModule, CountriesRoutingModule],
})
export class CountriesModule {}
