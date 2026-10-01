import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `<section class="container center nf"><h1>404</h1><h2>الصفحة غير موجودة</h2>
    <p class="muted">الصفحة اللي بتدور عليها مش موجودة أو اتنقلت.</p>
    <a routerLink="/" class="btn">العودة للرئيسية</a></section>`,
})
export class NotFound {}
