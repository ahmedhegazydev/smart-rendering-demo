import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  provideClientHydration,
  withIncrementalHydration,
} from '@angular/platform-browser';

/**
 * @constant serverConfig
 * @type {ApplicationConfig}
 * @description
 * Configuration object for the Angular server-side rendering (SSR) environment.
 * It merges necessary providers like `provideServerRendering()` and any application-wide providers from `appConfig`.
 */
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(), // Enables server-side rendering
    ...appConfig.providers, // Reuse app-level providers
  ],
};

/**
 * @constant config
 * @type {ApplicationConfig}
 * @description
 * The final merged configuration combining the base app config and the server-specific config.
 * Used to bootstrap the Angular application with both client and server capabilities.
 */
export const config = mergeApplicationConfig(appConfig, serverConfig);
