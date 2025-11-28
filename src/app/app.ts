import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastContainer } from './core/toast/toast-container';
import { Header } from './core/layout/header/header';
import { HeaderService } from './core/layout/header/header.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrls: ['./app.scss'],
    standalone: true,
    imports: [RouterOutlet, ToastContainer, Header],
})
export class App {
    private readonly headerService = inject(HeaderService);

    readonly headerConfig = this.headerService.headerConfig;
}