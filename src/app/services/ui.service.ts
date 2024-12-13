import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UiService {
  updateCount = new Subject<boolean>();
  update$ = this.updateCount.asObservable();
  snackBar = inject(MatSnackBar);

  constructor() {}

  openSnackBar(message: string, action: string = 'OK !') {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
