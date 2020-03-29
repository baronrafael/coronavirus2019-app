import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class InfoDrawerService {
  // Utility service for the toggle state of the info drawer
  private isToggled = new BehaviorSubject<boolean>(false);
  constructor() {}

  toggle() {
    this.isToggled.next(!this.isToggled.getValue());
  }

  get toggled$() {
    return this.isToggled.asObservable();
  }
}
