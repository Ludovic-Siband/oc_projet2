import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.html',
    styleUrls: ['./not-found.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class NotFoundComponent {

  constructor() { }

}
