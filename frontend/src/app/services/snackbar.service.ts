import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { config } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackBar: MatSnackBar) {
  }

  error(message: string) {
    return this._snackBar.open(message, "x", {panelClass: ['snackbar-error'], duration: 5000});
  }

  success(message: string) {
    return this._snackBar.open(message, "x", {panelClass: ['snackbar-success'], duration: 5000});
  }

  info(message: string) {
    return this._snackBar.open(message, "x", {panelClass: ['snackbar-info'], duration: 5000});
  }
}