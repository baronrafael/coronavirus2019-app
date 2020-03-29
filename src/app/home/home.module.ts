import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/components/home/home.component';
import { HomeRoutingModule } from '@app/home/home-routing.module';
import { MapComponent } from '@app/home/components/map-component/map.component';
import { LayerControllerComponent } from '@app/home/components/layer-controller/layer-controller.component';
import { MapLegendComponent } from '@app/home/components/map-legend/map-legend.component';
import { CountryPopupComponent } from '@app/home/components/map-component/country-popup/country-popup.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from '@environments/environment';

@NgModule({
  declarations: [
    HomeComponent,
    MapComponent,
    LayerControllerComponent,
    MapLegendComponent,
    CountryPopupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapBox.token,
    }),
  ],
})
export class HomeModule {}
