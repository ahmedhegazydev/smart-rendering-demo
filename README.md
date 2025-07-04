````markdown
# مشروع استكشاف الأفلام باستخدام Angular

هذا المشروع هو تطبيق ويب مبني باستخدام Angular يعرض قائمة بالأفلام المشهورة من خلال واجهة TheMovieDB API. يعتمد المشروع على أحدث تقنيات Angular مثل المكونات المستقلة (Standalone Components)، والمعالجة من جهة الخادم (Server-Side Rendering - SSR)، وتأجيل التفاعل (Defer Hydration) لتحسين الأداء وتجربة المستخدم.

---

## مميزات المشروع

- عرض قائمة بالأفلام الشهيرة من خلال واجهة API
- صفحة تفاصيل لكل فيلم تشمل إعلان الفيديو
- تحميل تدريجي لصفحات الأفلام (Infinite Scroll / Pagination)
- استخدام PrimeNG لعرض الكروت، الأزرار، والمؤشرات (Cards, Buttons, Spinners)
- تنسيق متجاوب بالكامل باستخدام Tailwind CSS
- حماية عرض مقاطع الفيديو باستخدام DomSanitizer
- دعم كامل للعرض من جهة الخادم (SSR)
- تحميل مؤجل للعناصر لتحسين سرعة التفاعل
- استخدام مكونات مستقلة بدون الحاجة إلى NgModules

---

## التقنيات المستخدمة

- Angular (الإصدار 17 أو أحدث)
- TheMovieDB API
- PrimeNG UI Toolkit (Card, Button, ProgressSpinner)
- Tailwind CSS
- العرض من جهة الخادم باستخدام @angular/ssr
- نظام التوجيه باستخدام @angular/router
- جلب البيانات باستخدام HttpClient
- حماية المحتوى باستخدام DomSanitizer

---

## خطوات التشغيل

1. **استنساخ المشروع**
   ```bash
   git clone https://github.com/ahmedhegazydev/smart-rendering-demo.git
   cd angular-movie-app
   ```
````

2. **تثبيت الحزم المطلوبة**

   ```bash
   npm install
   ```

3. **تشغيل التطبيق في الوضع المحلي**

   ```bash
   npm run dev
   ```

4. **بناء المشروع للعرض من جهة الخادم**

   ```bash
   npm run build:ssr
   ```

5. **تشغيل خادم SSR**

   ```bash
   npm run serve:ssr
   ```

---

## متطلبات بيئة التطوير

للتشغيل السليم، تحتاج إلى مفتاح API من موقع TheMovieDB.
يمكنك وضعه مباشرة داخل كود الخدمة كما يلي:

```ts
const apiKey = "ضع_مفتاحك_هنا";
```

أو يمكنك لاحقًا استخدام ملفات بيئية مثل `.env` عندما يتم تهيئة ذلك.

---

## هيكل المشروع

```
src/
├── app/
│   ├── movies-list/        مكون عرض قائمة الأفلام
│   ├── movie-details/      مكون عرض تفاصيل الفيلم
│   ├── safe.pipe.ts        بايب لحماية روابط الفيديو
│   ├── movie.service.ts    خدمة جلب بيانات الأفلام
├── app.routes.ts           إعدادات التوجيه
├── app.config.ts           مزودات التطبيق العامة
├── main.ts                 نقطة بدء التطبيق
├── server.ts               نقطة بدء SSR
```

---

## تحسينات مستقبلية مقترحة

- إضافة ميزة البحث عن الأفلام
- تصفية حسب التقييم أو النوع
- كتابة اختبارات للوحدات
- حفظ قائمة المفضلة باستخدام LocalStorage
- دعم الوضع الليلي

---
