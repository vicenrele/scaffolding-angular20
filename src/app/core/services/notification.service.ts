import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }

  error(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-error']
    });
  }

  info(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-info']
    });
  }

  /**
   * Muestra un snackbar de confirmación con acciones Aceptar/Cancelar.
   * Retorna una Promise que se resuelve con true si el usuario acepta, false si cancela o cierra.
   */
  confirm(message: string, action: string = 'Aceptar', cancel: string = 'Cancelar'): Promise<boolean> {
    // Abrimos el snackbar con dos acciones (Aceptar y Cancelar)
    const snackBarRef: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['snackbar-confirm']
    });

    return new Promise<boolean>((resolve) => {
      // Si el usuario hace clic en 'Aceptar'
      snackBarRef.onAction().subscribe(() => {
        resolve(true);
      });

      // Si se cierra el snackbar por timeout, clic fuera, o pulsando ESC
      snackBarRef.afterDismissed().subscribe((info) => {
        // Si NO aceptó (es decir, expiró o cerró)
        if (!info.dismissedByAction) {
          resolve(false);
        }
      });
    });
  }  
}