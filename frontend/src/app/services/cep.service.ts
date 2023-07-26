import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  Subject,
  catchError,
  combineLatest,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Cep } from '../models/cep';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  public findLocations$ = new Subject<Array<string>>();
  public getLocations$: Observable<Array<Cep>> = this.findLocations$.pipe(
    switchMap((ceps) =>
      combineLatest(
        ceps.map((cep) =>
          this.httpClient.get<Cep>(`https://viacep.com.br/ws/${cep}/json/`)
        )
      ).pipe(
        map((resonse): Array<Cep> => {
          const filtered = resonse
            .map((r) => {
              if ((r as any)['erro']) {
                // toastr to display erros
                return null;
              }
              return r;
            })
            .filter((r) => r !== null);

          return filtered as Array<Cep>;
        }),
        catchError((error) => {
          return of([]);
        })
      )
    )
  );

  constructor(private httpClient: HttpClient) {}
}
