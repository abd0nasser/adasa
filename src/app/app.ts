import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar, Footer } from './shared/layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  template: `<app-navbar /><main><router-outlet /></main><app-footer />`,
})
export class App {}
