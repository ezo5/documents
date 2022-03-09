import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MustachePipe} from './mustache.pipe';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe, DecimalPipe, registerLocaleData} from '@angular/common';
import cs from '@angular/common/locales/cs';

registerLocaleData(cs);

@NgModule({
    declarations: [
        AppComponent,
        MustachePipe,
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [{provide: LOCALE_ID, useValue: 'cs'}, DatePipe, DecimalPipe],
    bootstrap: [AppComponent]
})
export class AppModule {
}
