import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import {LOCALE_ID} from "@angular/core";

// The Express app is exported so that it can be used by serverless Functions.
export function app(lang: string): express.Express {
  const server = express();
  const distFolder = existsSync(join(process.cwd(), `dist/browser/${lang}`)) ? join(process.cwd(), `dist/browser/${lang}`) : join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
    providers: [{provide: LOCALE_ID, useValue: lang}]
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.use('/api', createProxyMiddleware({
    target: 'https://dashboard.gpshandle.com', secure: false, changeOrigin: true
  }));

  server.use('/oauth', createProxyMiddleware({
    target: 'https://dashboard.gpshandle.com', secure: false, changeOrigin: true
  }));

  server.get('*', (req, res) => {
    // const lang = req.get('x-language') ? req.get('x-language') :  'en';
    // const xDistFolder =existsSync(join(distFolder, lang)) ? join(distFolder, lang) : distFolder;
    // server.set('views', xDistFolder);
    // server.get('*.*', express.static(xDistFolder, {
    //   maxAge: '1y'
    // }));
    // console.log('Language', lang);
    // console.log('dist folder', xDistFolder);
    // res.setHeader('x-language', 'EN');
    // const indexHtml = existsSync(join(xDistFolder, 'index.original.html')) ? 'index.original.html' : 'index';
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });

    //this is for i18n
    // const matches = req.query.hl ? req.query.hl : req.url.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)\//);
    // const locale = (matches && supportedLocales.indexOf(matches[1]) !== -1) ? matches[1] : defaultLocale;
    // const xIndex = locale ? locale + '/' + indexHtml : indexHtml;
    //
    // res.render(xIndex, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });

  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4001;
  const appVI = app('vi');
  const appEN = app('en');
  const appPL = app('pl');
  const appPT = app('pt');
  const server = express();
  server.use('/en', appEN);
  server.use('/vi', appVI);
  server.use('/pt', appPT);
  server.use('/pl', appPL);
  server.use('', appEN);

  // Start up the Node server
  //const server = app('en');
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
