import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { IBookService } from './services/ibook.service';
import { InMemoryBookService } from './services/in-memory-book.service';
import { HttpBookService } from './services/http-book.service';

@NgModule({
  providers: [
    { provide: IBookService, useClass: InMemoryBookService },
    { provide: IBookService, useClass: HttpBookService }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }


  static forRoot(provider: 'http' | 'memory' = 'memory'): ModuleWithProviders<CoreModule> {
    let useClass;
    switch (provider) {
      case 'http': useClass = HttpBookService; break;
      default: useClass = InMemoryBookService;
    }
    return {
      ngModule: CoreModule,
      providers: [
        { provide: IBookService, useClass }
      ]
    };
  }
}