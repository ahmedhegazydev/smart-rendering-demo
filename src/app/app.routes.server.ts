import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { MovieService } from '../movie.service';
import { inject, runInInjectionContext } from '@angular/core';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'movies',
    renderMode: RenderMode.Incremental, //  incremental hydration
    // renderMode: RenderMode.Prerender, // صفحة كل الأفلام ثابتة
    // fallback: PrerenderFallback.Server, //  مش شرط لكن بيساعد لو الصفحة مش تولدت
  },
  {
    path: 'movie/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const movieService = inject(MovieService);
      const ids = await movieService.getAllIds(); // لازم ترجّع IDs هنا
      return ids.map((id: string) => ({ id }));
    },
    fallback: PrerenderFallback.Server,
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'contact',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Client, // fallback لأي صفحة غير معروفة
  },
];
