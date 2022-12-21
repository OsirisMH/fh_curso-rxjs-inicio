import { Observer, Observable } from 'rxjs';

const observer: Observer<any> = {
  next: value => console.log('next:', value),
  error: error => console.warn('error:', error),
  complete: () => console.info('completado'),
};

const intervalo$ = new Observable<number>( subscriber => {
  let contador = 0;

  const interval = setInterval( () => {
    contador++;
    subscriber.next( contador );
  }, 1000);

  setTimeout(() => {
    subscriber.complete();
  }, 2500);

  return () => {
    clearInterval( interval );
    console.log('Interval destroyed');
  }
});

const subs1 = intervalo$.subscribe( observer );
const subs2 = intervalo$.subscribe( observer );
const subs3 = intervalo$.subscribe( observer );

subs1.add( subs2 );
subs1.add( subs3 );

setTimeout(() => {
  // subs1.unsubscribe();
  // subs2.unsubscribe();
  // subs3.unsubscribe();

  console.log('Timeout completed');
}, 3000);