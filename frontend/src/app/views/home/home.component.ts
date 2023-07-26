import { Component, OnInit } from '@angular/core';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  locations$ = this.cepService.getLocations$;

  constructor(private cepService: CepService) {}

  ngOnInit(): void {
  }

}
