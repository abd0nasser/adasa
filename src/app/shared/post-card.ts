import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post, arDate } from '../core/blog.service';

@Component({
  selector: 'app-post-card',
  imports: [RouterLink],
  template: `
  @let p = post();
  <article class="card" [class.list]="layout() === 'list'">
    <a [routerLink]="['/blog', p.slug]" class="thumb"><img [src]="p.image" [alt]="p.title" loading="lazy" />
      @if (layout() === 'list' && p.featured) { <span class="tag gold"><i class="fa-solid fa-star"></i> مميز</span> }
      @else if (layout() !== 'list') { <span class="tag">{{ p.category }}</span> }</a>
    <div class="card-body">
      <div class="meta muted">
        @if (layout() === 'list') { <span class="pill plain">{{ p.category }}</span> }
        <span><i class="fa-regular fa-clock"></i>{{ p.readTime }}</span>
        @if (layout() !== 'list') { <span>•</span><span>{{ date(p.date) }}</span> }
      </div>
      <h3><a [routerLink]="['/blog', p.slug]">{{ p.title }}</a></h3>
      <p class="muted">{{ p.excerpt }}</p>
      <div class="card-foot">
        <div class="author"><span class="av"><img [src]="p.author.avatar" [alt]="p.author.name" /></span>
          <div><b>{{ p.author.name }}</b><small class="muted">{{ layout() === 'list' ? date(p.date) : p.author.role }}</small></div></div>
        @if (layout() === 'list') { <a [routerLink]="['/blog', p.slug]" class="more"><i class="fa-solid fa-arrow-left"></i> اقرأ المقال</a> }
        @else { <span class="go"><i class="fa-solid fa-chevron-left"></i></span> }
      </div>
    </div>
  </article>`,
})
export class PostCard {
  post = input.required<Post>();
  layout = input<'grid' | 'list'>('grid');
  date = arDate;
}
