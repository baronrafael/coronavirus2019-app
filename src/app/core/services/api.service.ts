import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { RequestOptions } from '../models/http/request-options';
import { Observable } from 'rxjs';
import { HOST_TOKEN } from '@core/models/constants';

@Injectable()
export class ApiService {
  private readonly host;

  constructor(protected http: HttpClient, @Inject(HOST_TOKEN) host: string) {
    this.host = host;
  }

  public get<T>(url: string, option?: RequestOptions): Observable<T>;

  public get<T>(
    url: string,
    option?: RequestOptions & { observe: 'response' },
  ): Observable<HttpResponse<T>>;

  public get(
    url: string,
    option?: RequestOptions & { responseType: 'arraybuffer' },
  ): Observable<ArrayBuffer>;

  public get(
    url: string,
    option?: RequestOptions & { responseType: 'blob' },
  ): Observable<Blob>;

  public get(
    url: string,
    option?: RequestOptions & { responseType: 'blob' } & {
      observe: 'response';
    },
  ): Observable<HttpResponse<Blob>>;

  public get(
    url: string,
    option?: RequestOptions & { observe?: 'body' | 'events' | 'response' } & {
      responseType?: 'blob' | 'arraybuffer';
    },
  ): Observable<any> {
    return this.http.get(`${this.host}${this.host ? '/' : ''}${url}`, option);
  }

  public post<T>(
    url: string,
    body: any,
    options?: RequestOptions,
    showValidationErrorMessage?: boolean,
  ): Observable<T>;

  public post<T>(
    url: string,
    body: any,
    options?: RequestOptions & { responseType: 'blob' } & {
      observe: 'response';
    },
    showValidationErrorMessage?: boolean,
  ): Observable<HttpResponse<Blob>>;

  public post<T>(
    url: string,
    body: any,
    option?: RequestOptions & { observe: 'events' },
    showValidationErrorMessage?: boolean,
  ): Observable<HttpEvent<T>>;

  public post<T>(
    url: string,
    body: any,
    // tslint:disable-next-line:unified-signatures
    options?: RequestOptions & { observe?: 'body' | 'events' | 'response' },
    showValidationErrorMessage?: boolean,
  ): Observable<T>;

  public post<T>(
    url: string,
    body: any,
    options?: RequestOptions & { observe?: 'body' | 'events' | 'response' },
    showValidationErrorMessage = true,
  ): Observable<any> {
    return this.http.post<T>(
      `${this.host}${this.host ? '/' : ''}${url}`,
      body,
      options,
    );
  }
}
