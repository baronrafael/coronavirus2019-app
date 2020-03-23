import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MapComponent } from './components/map-component/map.component';
import { GeneralInfoComponent } from '@shared/components/general-info/general-info.component';

import { environment } from '@environments/environment';

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MapLayerManagerService } from '@shared/services/map-layer-manager.service';
import { ISO3166ConverterService } from '@shared/services/iso-3166-converter.service';
import { MapInfoLayerComponent } from './components/map-info-layer/map-info-layer.component';
import { LayerControllerComponent } from './components/layer-controller/layer-controller.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    MapComponent,
    GeneralInfoComponent,
    MapInfoLayerComponent,
    LayerControllerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapBox.token,
    }),
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    MapComponent,
    GeneralInfoComponent,
    LayerControllerComponent,
  ],
  providers: [MapLayerManagerService, ISO3166ConverterService],
})
export class SharedModule {}
