import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { configuration } from 'src/app/config/config';
export class Clock {
  private expected;
  private timeout;

  constructor(private timeInterval, private callback: () => void) {}

  start(): void {
    console.log('start');
    console.log(Date.now());
    this.expected = Date.now() + this.timeInterval;
    console.log(this.expected);

    this.timeout = setTimeout(() => {
      this.round();
    }, this.timeInterval);
  }

  stop(): void {
    clearTimeout(this.timeout);
  }

  round(): void {
    console.log('round');
    const drift = Date.now() - this.expected;
    console.log(Date.now());
    this.callback();
    console.log(this.timeInterval);

    this.expected += this.timeInterval;
    this.timeout = setTimeout(() => {
      this.round();
    }, this.timeInterval - drift);
  }
}
