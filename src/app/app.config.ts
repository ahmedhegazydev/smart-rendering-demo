import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideHttpClient, withFetch } from '@angular/common/http';

// | الإعداد                                                 | الغرض                                             |
// | ------------------------------------------------------- | ------------------------------------------------- |
// | `provideZoneChangeDetection({ eventCoalescing: true })` | يقلل عدد مرات `change detection` عند تعدد الأحداث |
// | `provideRouter(routes)`                                 | يسجل التوجيه الأساسي للتطبيق                      |
// | `provideHttpClient(withFetch())`                        | يستخدم Fetch بدلًا من XHR                         |
// | `provideClientHydration(withIncrementalHydration())`    | يفعّل "Hydration تدريجي" بعد SSR                  |

/**
 * @constant appConfig
 * @type {ApplicationConfig}
 * @description
 * Core application configuration for Angular. It provides:
 * - Routing setup using `provideRouter`.
 * - HTTP client with Fetch API support.
 * - Incremental hydration support for better SSR performance.
 * - Optimized zone change detection using `eventCoalescing`.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Enables optimized zone-based change detection with event coalescing.
     * Coalescing merges multiple DOM events into one change detection cycle to reduce overhead.
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Registers the application's route definitions.
     */
    provideRouter(routes),

    /**
     * Configures the Angular HttpClient to use the native Fetch API under the hood.
     * This helps with performance and SSR compatibility.
     */
    provideHttpClient(withFetch()),

    /**
     * Enables client-side hydration after server-side rendering.
     * - `withIncrementalHydration()`: Progressive hydration of components based on visibility or usage.
     * - `withEventReplay()`: Replays user interactions (e.g. clicks) that occur before hydration completes.
     */
    provideClientHydration(withIncrementalHydration(), withEventReplay()),

    provideAnimations(),
  ],
};
