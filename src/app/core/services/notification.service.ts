import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Displays a success message in a snackbar.
   * @param message The message to display.
   */
  success(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }

  /**
   * Displays an error message in a snackbar.
   * @param message The message to display.
   */
  error(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-error']
    });
  }

  /**
   * Displays an informational message in a snackbar.
   * @param message The message to display.
   */
  info(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-info']
    });
  }

  /**
   * Displays a confirmation dialog in a snackbar.
   * @param message The message to display.
   * @param action The action button text.
   * @param cancel The cancel button text.
   * @returns A promise that resolves to true if the action is confirmed, false otherwise.
   */
  confirm(message: string, action: string = 'Aceptar', cancel: string = 'Cancelar'): Promise<boolean> {

    const snackBarRef: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['snackbar-confirm']
    });

    return new Promise<boolean>((resolve) => {
      snackBarRef.onAction().subscribe(() => {
        resolve(true);
      });


      snackBarRef.afterDismissed().subscribe((info) => {
        if (!info.dismissedByAction) {
          resolve(false);
        }
      });
    });
  }  
}