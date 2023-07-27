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
  tap,
} from 'rxjs';
import { Cep } from '../models/cep';
import { ToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  public findLocations$ = new Subject<Array<string>>();
  private _ceps: string[] = [];

  public getLocations$: Observable<Array<Cep>> = this.findLocations$.pipe(
    tap((ceps) => {
      this.loading$.next(true);
      this._ceps = ceps;
    }),
    switchMap((ceps: string[]) =>
      combineLatest(
        ceps.map((cep: string) =>
          this.httpClient.get<Cep>(`https://viacep.com.br/ws/${cep}/json/`)
        )
      ).pipe(
        delay(500),
        map((response) => {
          this.loading$.next(false);
          const invalidCeps: string[] = [];
          const filtered = response
            .map((r, i) => {
              if ((r as any)['erro']) {
                // toastr to display erros
                const cep = this._ceps[i];
                invalidCeps.push(cep);
                return null;
              }
              return r;
            })
            .filter((r) => r !== null);

          if (invalidCeps.length > 0) {
            this.toastr.displayToastr({
              display: true,
              title: 'Ocorreu um erro ao carregar os CEPs',
              body: `CEPs inválidos: ${invalidCeps.join(',')}`,
            });
          }

          return filtered as Array<Cep>;
        })
      )
    )
  );

  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}
}
