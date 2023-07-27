import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, tap } from 'rxjs';
import { Cep } from 'src/app/models/cep';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  locations$: Observable<Cep[]> = this.cepService.getLocations$.pipe(
    tap(() => {
      this.requestWasMade$.next(true);
    })
  );

  isLoading$ = this.cepService.loading$;

  private requestWasMade$ = new BehaviorSubject<boolean>(false);

  displayStartMessage$ = combineLatest([
    this.requestWasMade$.asObservable(),
    this.isLoading$.asObservable(),
  ]).pipe(
    map(([requestWasMade, loading]) => {
      if (!requestWasMade && !loading) {
        return true;
      }
      return false;
    })
  );

  constructor(private cepService: CepService) {}
}
