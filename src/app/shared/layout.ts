import { Component, inject, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BlogService } from '../core/blog.service';

@Component({
  selector: 'app-logo',
  template: `<svg class="logo" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="21" stroke="#f26a14" stroke-width="2.5"/>
    <g stroke="#f59e0b" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 9l7 12M39 24l-12 7M24 39l-7-12M9 24l12-7"/><circle cx="24" cy="24" r="6" fill="#f26a14"/></g>
  </svg>`,
})
export class Logo {}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, Logo],
  template: `
  <header class="nav"><div class="container nav-in">
    <a routerLink="/" class="brand"><app-logo />
      <div><b>عدسة</b><small>عالم التصوير الفوتوغرافي</small></div></a>
    <nav class="links">
      <a routerLink="/" routerLinkActive="on" [routerLinkActiveOptions]="{exact:true}">الرئيسية</a>
      <a routerLink="/blog" routerLinkActive="on">المدونة</a>
      <a routerLink="/about" routerLinkActive="on">من نحن</a>
    </nav>
    <div class="nav-end">
      <a routerLink="/blog" class="ico" aria-label="بحث"><i class="fa-solid fa-magnifying-glass"></i></a>
      <a routerLink="/blog" class="btn sm">ابدأ القراءة</a>
    </div>
  </div></header>`,
})
export class Navbar {}

@Component({
  selector: 'app-newsletter-form',
  template: `
  @if (done()) { <p class="ok"><i class="fa-solid fa-circle-check"></i> شكراً لاشتراكك!</p> }
  @else {
  <form [class]="cls()" (submit)="$event.preventDefault(); send(e.value); e.value = ''">
    <input #e type="email" required placeholder="أدخل بريدك الإلكتروني" />
    <button class="btn" type="submit">{{ label() }}</button>
  </form> }`,
})
export class NewsletterForm {
  cls = input('nform'); label = input('اشترك الآن'); done = signal(false);
  send(v: string) { if (v) this.done.set(true); }
}

@Component({
  selector: 'app-newsletter',
  imports: [NewsletterForm],
  template: `
  <section class="news"><div class="container"><div class="news-box">
    <div class="news-ico"><i class="fa-regular fa-envelope"></i></div>
    <h2>اشترك في <span class="gt">نشرتنا</span> الإخبارية</h2>
    <p class="muted">احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في بريدك الإلكتروني</p>
    <app-newsletter-form />
    <div class="proof">
      <span class="faces"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt=""><img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" alt=""><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" alt=""></span>
      <span>انضم لـ <b>+10,000</b> مصور</span><span>·</span><span>بدون إزعاج</span><span>·</span><span>إلغاء الاشتراك في أي وقت</span>
    </div>
  </div></div></section>`,
})
export class Newsletter {}

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NewsletterForm],
  template: `
  @if (d(); as data) {
  <footer class="footer"><div class="container">
    <div class="f-grid">
      <div><a routerLink="/" class="brand"><span class="logo sq">ع</span><b>{{ data.siteInfo.name }}</b></a>
        <p class="muted">{{ data.siteInfo.description }}</p>
        <div class="fsoc">
          <a [href]="data.siteInfo.social.youtube" aria-label="youtube"><i class="fa-brands fa-youtube"></i></a>
          <a [href]="data.siteInfo.social.linkedin" aria-label="linkedin"><i class="fa-brands fa-linkedin"></i></a>
          <a [href]="data.siteInfo.social.github" aria-label="github"><i class="fa-brands fa-github"></i></a>
          <a [href]="data.siteInfo.social.twitter" aria-label="x"><i class="fa-brands fa-x-twitter"></i></a>
        </div></div>
      <div><h4>استكشف</h4><a routerLink="/">الرئيسية</a><a routerLink="/blog">المدونة</a><a routerLink="/about">من نحن</a></div>
      <div><h4>التصنيفات</h4>
        @for (c of data.categories.slice(0, 4); track c.name) {
          <a routerLink="/blog" [queryParams]="{category: c.name}">{{ c.name }}</a> }
      </div>
      <div class="f-news"><h4>ابق على اطلاع</h4>
        <p class="muted" style="margin-top:0">اشترك للحصول على أحدث المقالات والتحديثات.</p>
        <app-newsletter-form cls="" label="اشترك" /></div>
    </div>
    <div class="copy muted">
      <span>© 2026 عدسة. صنع بكل <i class="fa-solid fa-heart"></i> جميع الحقوق محفوظة.</span>
      <span class="lk"><a>سياسة الخصوصية</a><a>شروط الخدمة</a></span>
    </div>
  </div></footer> }`,
})
export class Footer { d = toSignal(inject(BlogService).data$); }
