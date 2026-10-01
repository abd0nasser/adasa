import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs';

export interface Author { name: string; avatar: string; role: string; }
export interface Post {
  id: number; slug: string; title: string; excerpt: string; content: string;
  category: string; author: Author; image: string; date: string;
  readTime: string; featured: boolean; tags: string[];
}
export interface Category { name: string; count: number; color: string; }
export interface SiteInfo {
  name: string; tagline: string; description: string; email: string;
  social: { twitter: string; github: string; linkedin: string; youtube: string };
}
export interface BlogData { posts: Post[]; categories: Category[]; siteInfo: SiteInfo; }

/** يتعامل مع posts.json كأنه Response جاي من الـ Backend */
@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);
  readonly data$ = this.http.get<BlogData>('posts.json').pipe(shareReplay(1));
}

export const arDate = (d: string) =>
  new Date(d).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });
