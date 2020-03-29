import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GeneralInfoComponent } from '@shared/components/general-info/general-info.component';
import { MapLayerManagerService } from '@shared/services/map-layer-manager.service';
import { CountryCardComponent } from './components/country-card/country-card.component';

@NgModule({
  declarations: [GeneralInfoComponent, CountryCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    GeneralInfoComponent,
    CountryCardComponent,
  ],
  providers: [MapLayerManagerService],
})
export class SharedModule {}
