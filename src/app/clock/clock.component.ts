import { Component } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent {
  hour: string;
  minute: string;
  second: string;
  firstObsSubscripcion: Subscription;
  ngOnInit() {
    fetch('https://worldtimeapi.org/api/timezone/Europe/Warsaw')
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const resDate = new Date(res.datetime);
        this.hour = resDate.getHours().toString();
        this.minute = resDate.getMinutes().toString();
        this.second = resDate.getSeconds().toString();
      });
    this.firstObsSubscripcion = this.customIntervalObservable
      .pipe(
        map((element: number) => {
          return element;
        })
      )
      .subscribe(
        () => {
          this.updateTime();
        },
        (error: Error) => {
          alert(error);
        },
        () => {
          alert('Observable completed');
        }
      );
  }

  ngOnDestroy() {
    this.firstObsSubscripcion.unsubscribe();
  }

  updateTime() {
    let localSecond = Number(this.second);
    let localMinute = Number(this.minute);
    let localHour = Number(this.hour);

    localSecond++;

    if (localSecond > 60) {
      localSecond = 0;
      localMinute++;
    }
    if (localMinute > 60) {
      localMinute = 0;
      localHour++;
    }
    if (localHour > 24) {
      localHour = 0;
    }
    this.second = localSecond < 10 ? `0${localSecond}` : localSecond.toString();
    this.minute = localMinute < 10 ? `0${localMinute}` : localMinute.toString();
    this.hour = localHour < 10 ? `0${localHour}` : localHour.toString();
  }

  customIntervalObservable = Observable.create(
    (observer: Subscriber<number>) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000);
    }
  );
}
