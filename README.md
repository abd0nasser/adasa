# عدسة (Adasa) – Angular Blog
تشغيل: `npm install` ثم `ng serve` (يفتح على http://localhost:4200)

الصفحات: `/` الرئيسية، `/blog` المدونة (بحث + فلترة بالتصنيف + Grid/List + Pagination)،
`/blog/:slug` التفاصيل، وأي مسار غير موجود يعرض 404.
الداتا: `public/posts.json` بتتحمّل عبر HttpClient كأنها Response من الـ Backend.
