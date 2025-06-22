import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IBookService } from './services/ibook.service';
import { InMemoryBookService } from './services/in-memory-book.service';
// import { HttpBookService } from './services/http-book.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    // Cambia aquí entre InMemoryBookService y HttpBookService según lo necesites
    { provide: IBookService, useClass: InMemoryBookService }
    // { provide: IBookService, useClass: HttpBookService }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(useHttp: boolean = false): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        useHttp
          ? { provide: IBookService, useClass: /*HttpBookService*/ InMemoryBookService }
          : { provide: IBookService, useClass: InMemoryBookService }
      ]
    };
  }
}