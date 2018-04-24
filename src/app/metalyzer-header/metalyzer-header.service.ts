import { Injectable } from '@angular/core';

@Injectable()
export class MetalyzerHeaderService {

  constructor() { }
  private config_type: string;
  private isConfig: boolean;
  getConfigType() {
    return this.config_type;
  }
  getIsConfig(): boolean {
    return this.isConfig;
  }
  setConfigType(config_type: string) {
    this.config_type = config_type;
  }
  setIsConfig(isConfig: boolean) {
    this.isConfig = isConfig;
  }
}
