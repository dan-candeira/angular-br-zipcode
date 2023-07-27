import { Component } from '@angular/core';
import { CepService } from './services/cep.service';
import { ToastrService } from './services/toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'adressByCEP';
  loading$ = this.cepService.loading$;
  toastr$ = this.toastr.toastrState$;

  constructor(
    private cepService: CepService, 
    private toastr: ToastrService
  ) {}
}
