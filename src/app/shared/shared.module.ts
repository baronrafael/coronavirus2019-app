import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MapComponent } from './components/map-component/map.component';
import { GeneralInfoComponent } from '@shared/components/general-info/general-info.component';

@NgModule({
  declarations: [MapComponent, GeneralInfoComponent],
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
    MapComponent,
    GeneralInfoComponent,
  ],
})
export class SharedModule {}
