import { Injectable } from '@angular/core';

@Injectable()
export class MetalyzerHeaderService {
  private config_type: string;
  private isConfig_Mode: boolean;
  constructor() {
    this.config_type = 'Configuration';
    this.isConfig_Mode = true;
  }
  getConfigType() {
    return this.config_type;
  }
  getIsConfigMode(): boolean {
    return this.isConfig_Mode;
  }
  setConfigType(config_type: string) {
    this.config_type = config_type;
  }
  setIsConfigMode(isConfig: boolean) {
    this.isConfig_Mode = isConfig;
  }
}
