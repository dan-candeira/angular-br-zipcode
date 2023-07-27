import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastrState {
  display: boolean;
  body: string;
  title: string;
  delay?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  toastrState$ = new BehaviorSubject<ToastrState>({
    display: false,
    body: '',
    title: '',
    delay: 2000
  });

  constructor() {}

  displayToastr({ display = false, title = '', body = '', delay = 3000 }: ToastrState): void {
    this.toastrState$.next({ display, title, body });

    setTimeout(() => {
      this.toastrState$.next({ display: false, title, body });
    }, delay)
  }
}
