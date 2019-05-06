import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private appConfig;
  private appConfigPath = 'assets/app-config.json';
  constructor(
    private http: HttpClient
  ) { }
  loadAppConfig() {
    const http = this.http;
    return http.get(this.appConfigPath).toPromise().then(data => {
      this.appConfig = data;
    }).catch(error => {
      console.warn('Error loading app-config.json, using envrionment file instead');
      this.appConfig = environment;
    });
  }

  get apiUrl() {
    return this.appConfig.apiUrl;
  }
}
