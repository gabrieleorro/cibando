import { Component } from '@angular/core';
import { Observable, combineLatest, of, forkJoin } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';


@Component({
  selector: 'app-esempio-combine',
  templateUrl: './esempio-combine.component.html',
  styleUrls: ['./esempio-combine.component.scss']
})
export class EsempioCombineComponent {

  nomi1 = [{ name: 'Danilo'}, { name: 'Carlos'}, { name: 'Marios'}];
  nomi2 = [{ name: 'Alessia'}, { name: 'Carla'}];

  private primoGruppo$: Observable<any[]>;
  private secondoGruppo$: Observable<any[]>;
  private terzoGruppo$: Observable<string[]>;

  gruppiCombinati$: Observable<any[]>;
  gruppi: any[];
  time = true;

  constructor(){
    this.primoGruppo$ = of(this.nomi1).pipe(
      delay(0),
      tap((valori) => console.log('Emesso il primo gruppo: ', valori))
    );
    this.secondoGruppo$ = of(this.nomi2).pipe(
      delay(3000),
      tap((valori) => console.log('Emesso il secondo gruppo: ', valori))
    );
    this.terzoGruppo$ = of(['Sony', 'Apple']).pipe(
      delay(1500),
      tap((valori) => console.log('Emesso il terzo gruppo: ', valori))
    );

    // this.gruppiCombinati$ = combineLatest(this.primoGruppo$, this.secondoGruppo$, this.terzoGruppo$).pipe(
    //   map(([primaChiamata, secondaChiamata, terzaChiamata]) => {
    //     console.log('Prima chiamata: ' + JSON.stringify(primaChiamata));
    //     console.log('Seconda chiamata: ' + JSON.stringify(secondaChiamata));
    //     console.log('Terza chiamata: ' + JSON.stringify(terzaChiamata));
    //     return [].concat(primaChiamata).concat(secondaChiamata).concat(terzaChiamata);
    //   }),
    //   tap((val) => console.log('Valori uniti: ', val))
    // )

    this.gruppiCombinati$ =  forkJoin(this.primoGruppo$, this.secondoGruppo$, this.terzoGruppo$).pipe(
      map((res) => {
        this.time = false;
        return this.gruppi = res
      })
    );
  }

}
