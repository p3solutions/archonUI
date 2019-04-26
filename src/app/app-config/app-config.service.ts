import { Injectable, Injector } from '@angular/core';
import { EnvironmentService } from '../environment/environment.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  injector = Injector.create({ providers: [] });
  constructor(private http: HttpClient) { }
  private environment: EnvironmentService = new EnvironmentService(this.http);
  get apiUrl() {
    return this.environment.config.apiUrl;
  }
}
