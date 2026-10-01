import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BlogService } from '../core/blog.service';
import { PostCard } from '../shared/post-card';
import { Newsletter } from '../shared/layout';
import { CAT_ICONS } from './blog';

@Component({
  selector: 'app-home',
  imports: [RouterLink, PostCard, Newsletter],
  template: `
  <section class="hero grid-bg"><div class="container center">
    <span class="pill">مرحباً بك في عدسة</span>
    <h1>اكتشف <span class="gt">فن</span><br />التصوير الفوتوغرافي</h1>
    <p class="muted">انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير.</p>
    <div class="actions"><a routerLink="/blog" class="btn">استكشف المقالات <i class="fa-solid fa-arrow-left"></i></a>
      <a routerLink="/about" class="btn ghost"><i class="fa-regular fa-circle-question"></i> اعرف المزيد</a></div>
    @if (d(); as data) {
    <div class="stats">
      <div><i class="fa-solid fa-newspaper"></i><b>{{ data.posts.length }}+</b><span>مقالة</span></div>
      <div><i class="fa-solid fa-users"></i><b>+10ألف</b><span>قارئ</span></div>
      <div><i class="fa-solid fa-folder"></i><b>{{ data.categories.length }}</b><span>تصنيفات</span></div>
      <div><i class="fa-solid fa-pen-nib"></i><b>{{ authorsCount() }}</b><span>كاتب</span></div>
    </div> }
  </div></section>

  @if (d(); as data) {
  <section class="container sec"><div class="sec-head">
      <div><span class="pill">مميز</span><h2 class="t">مقالات مختارة</h2><p class="muted sec-sub">محتوى منتقى ليبدأ رحلة تعلمك</p></div>
      <a routerLink="/blog" class="btn sm">عرض الكل <i class="fa-solid fa-angle-left"></i></a></div>
    <div class="feat">
      @for (p of featured(); track p.id) { <app-post-card [post]="p" layout="list" /> }
    </div></section>

  <section class="alt"><div class="container sec center">
    <span class="pill">التصنيفات</span><h2 class="t">استكشف حسب الموضوع</h2>
    <p class="muted sec-sub">اختر التصنيف الذي يناسب اهتماماتك</p>
    <div class="cats">
      @for (c of data.categories; track c.name) {
        <a class="cat" routerLink="/blog" [queryParams]="{category: c.name}">
          <span class="ci"><i [class]="'fa-solid ' + icon(c.name)"></i></span><b>{{ c.name }}</b><small class="muted">{{ c.count }} مقالة</small></a> }
    </div></div></section>

  <section class="container sec"><div class="sec-head">
      <div><span class="pill">الأحدث</span><h2 class="t">أحدث المقالات</h2><p class="muted sec-sub">محتوى جديد طازج من المطبعة</p></div>
      <a routerLink="/blog" class="more">عرض جميع المقالات <i class="fa-solid fa-arrow-left"></i></a></div>
    <div class="grid">
      @for (p of latest(); track p.id) { <app-post-card [post]="p" /> }
    </div></section>
  <app-newsletter /> }`,
})
export class Home {
  d = toSignal(inject(BlogService).data$);
  icon = (n: string) => CAT_ICONS[n] ?? 'fa-camera';
  featured = computed(() => this.d()?.posts.filter(p => p.featured).slice(0, 3) ?? []);
  latest = computed(() => [...(this.d()?.posts ?? [])].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3));
  authorsCount = computed(() => new Set(this.d()?.posts.map(p => p.author.name)).size);
}
