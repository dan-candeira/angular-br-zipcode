import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  delay,
  map,
  switchMap,
  tap
} from 'rxjs';
import { Cep } from '../models/cep';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  public findLocations$ = new Subject<Array<string>>();

  public getLocations$: Observable<Array<Cep>> = this.findLocations$.pipe(
    tap(() => this.loading$.next(true)),
    switchMap((ceps: string[]) =>
      combineLatest(
        ceps.map((cep: string) =>
          this.httpClient.get<Cep>(`https://viacep.com.br/ws/${cep}/json/`)
        )
      ).pipe(
        delay(500),
        map((response) => {
          this.loading$.next(false);
          const filtered = response
            .map((r) => {
              if ((r as any)['erro']) {
                // toastr to display erros
                alert('error');
                return null;
              }
              return r;
            })
            .filter((r) => r !== null);

          return filtered as Array<Cep>;
        })
      )
    )
  );

  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}
}
