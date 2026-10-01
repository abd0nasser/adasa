import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BlogService } from '../core/blog.service';
import { PostCard } from '../shared/post-card';

const PAGE_SIZE = 6;
export const CAT_ICONS: Record<string, string> = {
  'إضاءة': 'fa-sun', 'بورتريه': 'fa-user', 'مناظر طبيعية': 'fa-mountain-sun', 'تقنيات': 'fa-sliders', 'معدات': 'fa-gear',
};

/** حالة الصفحة (بحث/تصنيف/عرض/رقم الصفحة) محفوظة في الـ query params */
@Component({
  selector: 'app-blog',
  imports: [PostCard, RouterLink],
  template: `
  <section class="page-hero grid-bg center"><div class="container">
    <span class="pill"><i class="fa-regular fa-newspaper"></i> مدونتنا</span>
    <h1>استكشف <span class="gt">مقالاتنا</span></h1>
    <p class="muted">اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث</p>
  </div></section>

  <div class="toolbar"><div class="container">
    <div class="search"><i class="fa-solid fa-magnifying-glass"></i>
      <input type="search" placeholder="ابحث في المقالات..." [value]="q() ?? ''" (input)="go({ q: $any($event.target).value || null })" /></div>
    <div class="chips">
      <button class="chip" [class.on]="!category()" (click)="go({ category: null })">جميع المقالات</button>
      @for (c of d()?.categories; track c.name) {
        <button class="chip" [class.on]="category() === c.name" (click)="go({ category: c.name })">{{ c.name }}</button> }
    </div>
  </div></div>

  <section class="container">
    <div class="bar2">
      <p class="count muted">عرض <b>{{ filtered().length }}</b> مقالات
        @if (category()) { في <em>{{ category() }}</em> }</p>
      <div class="tools">
        @if (q() || category()) { <button class="clear" (click)="clear()"><i class="fa-solid fa-xmark"></i> مسح الفلاتر</button> }
        <div class="toggle">
          <button [class.on]="layout() === 'grid'" (click)="go({ view: null }, false)" aria-label="شبكة"><i class="fa-solid fa-table-cells-large"></i></button>
          <button [class.on]="layout() === 'list'" (click)="go({ view: 'list' }, false)" aria-label="قائمة"><i class="fa-solid fa-bars"></i></button>
        </div>
      </div>
    </div>

    @if (paged().length) {
      <div [class]="layout() === 'list' ? 'stack' : 'grid'">
        @for (p of paged(); track p.id) { <app-post-card [post]="p" [layout]="layout()" /> }
      </div>
    } @else {
      <div class="empty center"><h3>لا توجد نتائج</h3><a routerLink="/blog" class="btn">مسح الفلاتر</a></div>
    }

    @if (pages().length > 1) {
      <nav class="pager">
        <button class="arr" [disabled]="current() === 1" (click)="go({ page: current() - 1 }, false)" aria-label="السابق"><i class="fa-solid fa-chevron-right"></i></button>
        @for (n of pages(); track n) { <button [class.on]="n === current()" (click)="go({ page: n }, false)">{{ n }}</button> }
        <button class="arr" [disabled]="current() === pages().length" (click)="go({ page: current() + 1 }, false)" aria-label="التالي"><i class="fa-solid fa-chevron-left"></i></button>
      </nav>
      <p class="pg-note">صفحة {{ current() }} من {{ pages().length }}</p> }
    <div style="height:5rem"></div>
  </section>`,
})
export class Blog {
  // القيم دي بتيجي تلقائياً من الـ query params (withComponentInputBinding)
  q = input<string>();
  category = input<string>();
  view = input<string>();
  page = input<string>();

  private router = inject(Router);
  d = toSignal(inject(BlogService).data$);

  layout = computed<'grid' | 'list'>(() => (this.view() === 'list' ? 'list' : 'grid'));
  filtered = computed(() => {
    const term = (this.q() ?? '').trim().toLowerCase();
    const cat = this.category();
    return (this.d()?.posts ?? []).filter(p =>
      (!cat || p.category === cat) &&
      (!term || [p.title, p.excerpt, p.category, ...p.tags].some(t => t.toLowerCase().includes(term))));
  });
  pages = computed(() => Array.from({ length: Math.ceil(this.filtered().length / PAGE_SIZE) }, (_, i) => i + 1));
  current = computed(() => Math.min(Math.max(Number(this.page()) || 1, 1), this.pages().length || 1));
  paged = computed(() => this.filtered().slice((this.current() - 1) * PAGE_SIZE, this.current() * PAGE_SIZE));

  clear() { this.router.navigate([], { queryParams: { q: null, category: null, page: null } , queryParamsHandling: 'merge' }); }

  /** resetPage: أي تغيير في البحث/التصنيف بيرجّعنا للصفحة الأولى */
  go(params: Record<string, string | number | null>, resetPage = true) {
    this.router.navigate([], {
      queryParams: resetPage ? { ...params, page: null } : params,
      queryParamsHandling: 'merge',
      replaceUrl: params['q'] !== undefined,
    });
  }
}
