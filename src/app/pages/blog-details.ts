import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BlogService, arDate } from '../core/blog.service';
import { PostCard } from '../shared/post-card';
import { NotFound } from './not-found';
import { Newsletter } from '../shared/layout';

@Component({
  selector: 'app-blog-details',
  imports: [RouterLink, PostCard, NotFound, Newsletter],
  template: `
  @if (d()) {
    @if (post(); as p) {
    <article class="container sec article">
      <a routerLink="/blog" class="more back"><i class="fa-solid fa-arrow-right"></i> العودة للمدونة</a>
      <span class="pill plain">{{ p.category }}</span>
      <h1>{{ p.title }}</h1>
      <div class="author big"><span class="av"><img [src]="p.author.avatar" [alt]="p.author.name" /></span>
        <div><b>{{ p.author.name }}</b><small class="muted">{{ p.author.role }} • {{ date(p.date) }} • {{ p.readTime }}</small></div></div>
      <img class="cover" [src]="p.image" [alt]="p.title" />
      <div class="content">
        @for (b of blocks(); track $index) {
          @if (b.h) { <h2>{{ b.text }}</h2> } @else { <p>{{ b.text }}</p> } }
      </div>
      <div class="tags">@for (t of p.tags; track t) { <span class="pill plain"># {{ t }}</span> }</div>
      @if (related().length) {
        <h2 class="rel">مقالات ذات صلة</h2>
        <div class="grid">@for (r of related(); track r.id) { <app-post-card [post]="r" /> }</div> }
    </article>
    } @else { <app-not-found /> }
    <app-newsletter />
  }`,
})
export class BlogDetails {
  slug = input.required<string>(); // من الـ route param
  d = toSignal(inject(BlogService).data$);
  date = arDate;

  post = computed(() => this.d()?.posts.find(p => p.slug === this.slug()));
  related = computed(() => (this.d()?.posts ?? [])
    .filter(p => p.category === this.post()?.category && p.id !== this.post()?.id).slice(0, 3));
  blocks = computed(() => (this.post()?.content ?? '').split(/\n\n+/).map(t =>
    t.startsWith('## ') ? { h: true, text: t.slice(3) } : { h: false, text: t }));
}
