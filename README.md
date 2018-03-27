# ArchonUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Setup Server Environment

1. Copy the `dist` folder into linux based Server
2. Install nginx server
3. Go to `/etc/nginx/sites-available` and open `default` file.
4. Change the `root` to the point to `dist` folder.
5. Change `location` in the same file to fall back to `index.html` if the requested link is not found by changing it to this

```
location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying index.html.
                try_files $uri /index.html;
        }
```

6. Start your server by using the command

```
sudo service nginx start
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
