import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BlogService, Author } from '../core/blog.service';
import { Newsletter } from '../shared/layout';

@Component({
  selector: 'app-about',
  imports: [Newsletter],
  template: `
  <section class="page-hero grid-bg center"><div class="container">
    <span class="pill">من نحن</span>
    <h1>قصة <span class="gt">عدسة</span></h1>
    <p class="muted">نؤمن أن كل صورة تحكي قصة، ونساعدك على روايتها بشكل أفضل</p>
  </div></section>

  <section class="alt"><div class="container sec center">
    <h2 class="t bars">قيمنا</h2><p class="muted sec-sub">المبادئ التي توجه كل ما نقوم بإنشائه</p>
    <div class="values">
      <div class="val"><i class="fa-solid fa-bullseye"></i><b>الجودة أولاً</b><span class="muted">محتوى مدروس ومكتوب بخبرة</span></div>
      <div class="val"><i class="fa-solid fa-bolt"></i><b>تركيز عملي</b><span class="muted">أمثلة واقعية يمكنك تطبيقها اليوم</span></div>
      <div class="val"><i class="fa-solid fa-handshake"></i><b>المجتمع</b><span class="muted">تعلم مع آلاف المصورين</span></div>
      <div class="val"><i class="fa-solid fa-rotate"></i><b>دائماً محدث</b><span class="muted">أحدث الاتجاهات وأفضل الممارسات</span></div>
    </div></div></section>

  <section class="container sec center">
    <span class="pill">الفريق</span><h2 class="t">تعرف على كتابنا</h2>
    <p class="muted sec-sub">فريقنا من المصورين والكتاب ذوي الخبرة شغوفون بمشاركة معرفتهم مع المجتمع.</p>
    <div class="writers">
      @for (a of authors(); track a.name) {
        <div class="writer">
          <div class="pic"><img [src]="a.avatar" [alt]="a.name" loading="lazy" /><i class="fa-solid fa-check"></i></div>
          <b>{{ a.name }}</b><span class="role">{{ a.role }}</span>
          <div class="socials"><a href="#" aria-label="linkedin"><i class="fa-brands fa-linkedin"></i></a>
            <a href="#" aria-label="github"><i class="fa-brands fa-github"></i></a>
            <a href="#" aria-label="x"><i class="fa-brands fa-x-twitter"></i></a></div>
        </div> }
    </div>
  </section>
  <app-newsletter />`,
})
export class About {
  d = toSignal(inject(BlogService).data$);
  authors = computed(() => {
    const m = new Map<string, Author>();
    (this.d()?.posts ?? []).forEach(p => m.has(p.author.name) || m.set(p.author.name, p.author));
    return [...m.values()];
  });
}
