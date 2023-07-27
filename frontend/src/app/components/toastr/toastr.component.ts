import { Component, Directive, OnInit, ViewEncapsulation } from '@angular/core';

@Directive({
  selector: '[appToastrTitle]',
  host: {
    class: 'toastr-title',
  },
})
export class ToastrTitleDirective {}

@Directive({
  selector: '[appToastrBody]',
  host: {
    class: 'toastr-body',
  },
})
export class ToastrBodyDirective {}

@Component({
  selector: 'app-toastr',
  template: `
    <ng-content selector="[appToastrTitle]"></ng-content>
    <ng-content selector="[appToastrBody]"></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .toastr {
        position: fixed;
        z-index: 3;
        width: 35ch;
        padding-block: 0.5rem;
        padding-inline: 1rem;
        right: 0;
        bottom: 7rem;
      }

      .toastr .toastr-title {
        margin-bottom: 0;
      }

      .toastr .toastr-body {
        margin-top: 1rem;
        margin-bottom: 0;
      }
    `,
  ],
  host: {
    role: 'alert',
    'aria-live': 'polite',
    class: 'toastr'
  },
})
export class ToastrComponent {}
