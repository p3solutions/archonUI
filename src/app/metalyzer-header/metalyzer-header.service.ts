import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class MetalyzerHeaderService {
  private phase = new BehaviorSubject<string>('Analysis');
  cast = this.phase.asObservable();
  constructor() {
  }
  setPhase(phase: string) {
    this.phase.next(phase);
  }
  getPhase() {
    return this.phase;
  }
}
