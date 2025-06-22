import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'library',
    loadChildren: () =>
      import('./library/library.module').then(m => m.LibraryModule)
  },
  { path: '', redirectTo: '/library', pathMatch: 'full' },
  { path: '**', redirectTo: '/library' }
];
