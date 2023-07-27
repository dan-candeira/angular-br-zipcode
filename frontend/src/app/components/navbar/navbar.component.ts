import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cepInput = '';

  constructor(private cepService: CepService) {}

  getCeps(): void {
    const ceps = this.cepInput
      .split(';')
      .map((c: string) => c.replace(/\s/g, ''));
      console.log('heeey', ceps)
    this.cepService.findLocations$.next(ceps);
  }

}
