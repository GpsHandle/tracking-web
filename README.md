# NgClient

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Cde conventions
- Every private thing start with _, includes directory, class, attributes, methods.
- Public thing start with a character.

## Third party library
Simply install your library via npm install lib-name --save and import it in your code.

If the library does not include typings, you can install them using npm:

npm install d3 --save
npm install @types/d3 --save-dev
Then open src/tsconfig.app.json and add it to the types array:

"types":[
  "d3"
]
If the library you added typings for is only to be used on your e2e tests, instead use e2e/tsconfig.e2e.json. The same goes for unit tests and src/tsconfig.spec.json.

If the library doesn't have typings available at @types/, you can still use it by manually adding typings for it:

First, create a typings.d.ts file in your src/ folder. This file will be automatically included as global type definition.

Then, in src/typings.d.ts, add the following code:

declare module 'typeless-package';
Finally, in the component or file that uses the library, add the following code:
import * as typelessPackage from 'typeless-package';
typelessPackage.method();
Done. Note: you might need or find useful to define more typings for the library that you're trying to use.

### Work with icon-font
To build a customized font icon for the project.
- Go to page: https://icomoon.io/app
- Create project and load svg icon
- Download font-icon to folder assets/

To load current font-icon into IconMoon, let use file ```selection.json```

Import into the project via .angular-cli.json

### work with custom-theme

Create a theme call app-theme.scss

### Internationalization
```shell script
ng xi18n --output-path
ng xi18n --output-path src/locale
```


###Angular Universal
```shell script
npm run build:ssr && npm run serve:ssr
```
