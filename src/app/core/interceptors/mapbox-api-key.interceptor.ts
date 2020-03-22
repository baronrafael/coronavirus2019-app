import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

// Interceptor to check if we must append the mapbox access key to the request
@Injectable()
export class MapboxApiKeyInterceptor implements HttpInterceptor {
  private readonly interceptUrls: string[];

  constructor() {
    this.interceptUrls = Object.values(environment.mapBox.urls);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (!this.mustIntercept(request.url)) {
      return next.handle(request);
    }

    const req = request.clone({
      url: request.urlWithParams,
      params: new HttpParams({
        fromObject: {
          access_token: environment.mapBox.token,
        },
      }),
    });

    return next.handle(req);
  }

  // Pretty cheap way to check if we must add the access token
  private mustIntercept(url: string): boolean {
    return this.interceptUrls.includes(url);
  }
}
