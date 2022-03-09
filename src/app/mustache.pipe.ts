import {Pipe, PipeTransform} from '@angular/core';
import * as Mustache from 'mustache';

@Pipe({
    name: 'mustache',
    pure: false
})
export class MustachePipe implements PipeTransform {

    transform(template: string, content: any): string {
        return Mustache.render(template, content);
    }
}
