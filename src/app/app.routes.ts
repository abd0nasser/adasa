import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { Blog } from './pages/blog';
import { BlogDetails } from './pages/blog-details';
import { NotFound } from './pages/not-found';
import { About } from './pages/about';

export const routes: Routes = [
  { path: '', component: Home, title: 'عدسة | الرئيسية' },
  { path: 'blog', component: Blog, title: 'عدسة | المدونة' },
  { path: 'blog/:slug', component: BlogDetails, title: 'عدسة | تفاصيل المقال' },
  { path: 'about', component: About, title: 'عدسة | من نحن' },
  { path: '**', component: NotFound, title: 'عدسة | 404' },
];
