import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { MapboxApiKeyInterceptor } from '@core/interceptors';
import {
  HOST_TOKEN,
  MAPBOX_DATASET_API_SERVICE,
  NOVEL_COVID_SERVICE,
} from '@core/models/constants';
import { environment } from '@environments/environment';
import { ApiService } from '@core/services';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { InfoDrawerService } from '@core/services/info-drawer.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, LoadingBarHttpClientModule],
  exports: [LoadingBarHttpClientModule],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        InfoDrawerService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MapboxApiKeyInterceptor,
          multi: true,
        },
        {
          provide: HOST_TOKEN,
          useValue: environment.novelCovidUrl,
          multi: true,
        },
        {
          provide: HOST_TOKEN,
          useValue: environment.mapBox.urls.datasets,
          multi: true,
        },
        {
          provide: NOVEL_COVID_SERVICE,
          useFactory: (http: HttpClient, host: string[]) => {
            // Cheap workaround because I have like 45 minutes fighting with this
            return new ApiService(http, host[0]);
          },
          deps: [HttpClient, HOST_TOKEN],
        },
        {
          provide: MAPBOX_DATASET_API_SERVICE,
          useFactory: (http: HttpClient, host: string[]) => {
            return new ApiService(http, host[1]);
          },
          deps: [HttpClient, HOST_TOKEN],
        },
      ],
    };
  }
}
