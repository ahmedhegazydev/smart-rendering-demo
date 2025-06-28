import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// | الدالة                                                         | ما تُستخدم له                                              | مثال                          |
// | -------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------- |
// | `bypassSecurityTrustHtml(html: string): SafeHtml`              | لعرض HTML مخصص داخل `innerHTML`                            | عرض مقال أو وصف منتج HTML     |
// | `bypassSecurityTrustStyle(style: string): SafeStyle`           | لتطبيق CSS مباشرة مثل `[style.background]`                 | استخدام ألوان من قواعد خارجية |
// | `bypassSecurityTrustScript(script: string): SafeScript`        | لتضمين JavaScript (نادر وخطير جدًا)                        | مثل تضمين كود من طرف ثالث     |
// | `bypassSecurityTrustUrl(url: string): SafeUrl`                 | لربط روابط (مثل `<a href="...">`)                          | تحميل ملفات أو التنقل         |
// | `bypassSecurityTrustResourceUrl(url: string): SafeResourceUrl` | لتضمين روابط مصادر (مثل `<iframe>`, `<object>`, `<embed>`) | عرض فيديوهات يوتيوب           |

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
