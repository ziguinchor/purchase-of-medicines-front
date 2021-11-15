/*!

=========================================================
* Now UI Dashboard Angular - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-angular
* Copyright 2020 Medicare (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-angular/blob/master/LICENSE.md)

* Coded by Medicare

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
