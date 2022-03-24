import {ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
    selector: 'app-root',
    template: ` <div [innerHTML]="template | mustache: data | safeHtml"></div>`,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public data: object = {};
    public template = '';
    public color = '#00A4ED';

    constructor(private cdr: ChangeDetectorRef, private httpClient: HttpClient, private datePipe: DatePipe, private decimalPipe: DecimalPipe) {
        this.httpClient.get('assets/data.json').subscribe(data => {
            this.data = {
                ...data,
                formatDate: () => (text: string, render: (text: string) => any) => {
                    return datePipe.transform(render(text), 'dd.MM.YYYY') as string;
                },
                formatNumber: () => (text: string, render: (text: any) => any) => {
                    return decimalPipe.transform(render(parseInt(text, 10))) || (render(text) as string);
                },
                queryString: () => (text: string, render: (text: any) => any) => {
                    return 'http://localhost:82/' + render(text);
                },
                companyColor: () => (text: string, render: (text: any) => any) => {
                    return this.color;
                }
            };
            this.cdr.markForCheck();
        });

        this.httpClient.get('assets/header-sm.html', {responseType: 'text'}).subscribe(html => {
            this.template = html;
            this.cdr.markForCheck();
        });
    }
}
