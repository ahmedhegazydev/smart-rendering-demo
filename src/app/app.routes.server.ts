import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // {
  //   path: '**',
  //   renderMode: RenderMode.Prerender,
  // },
  {
    path: 'about',
    renderMode: RenderMode.Prerender, //  SSG
  },
  {
    path: 'profile',
    renderMode: RenderMode.Server, //  SSR
  },
  {
    path: 'contact',
    renderMode: RenderMode.Client, //  CSR
  },
];
