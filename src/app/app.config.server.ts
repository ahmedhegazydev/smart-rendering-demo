import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
// import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  provideClientHydration,
  withIncrementalHydration,
} from '@angular/platform-browser';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // provideServerRouting(serverRoutes),
    ...appConfig.providers,
    // provideHttpClient(withFetch()), //  كده بتفعل fetch API,
    // provideClientHydration(withIncrementalHydration()),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
