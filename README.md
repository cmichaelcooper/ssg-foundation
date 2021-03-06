# SSG Foundation

A basic static site generator using eleventy.

## Development Notes

* Need to solve headless CMS integration for Jamstack

## Getting started

1. Clone or fork this repo: `git clone git@github.com:cmichaelcooper/ssg-foundation.git`
2. `cd` into the project directory and run `npm install`

## Running and serving a dev build

```sh
npm run dev
```

Browse to [http://localhost:8080](http://localhost:8080).

## Running and serving a prod build

```sh
npm run prod
npm run serve:prod
```

Browse to [http://localhost:5000](http://localhost:5000).

## Technologies used

* [Eleventy](https://www.11ty.dev/) for static site generation
* [Nunjucks](https://mozilla.github.io/nunjucks/) which is the default templating engine for Eleventy
* [Sass](https://sass-lang.com/) for writing CSS
* [TailwindCSS] (https://tailwindcss.com/) for atomic classes in HTML
* [Babel](https://babeljs.io/) for transpiling and polyfilling JavaScript
* [Autoprefixer](https://github.com/postcss/autoprefixer) for vendor prefixing CSS
* [Webpack](https://webpack.js.org/) for compiling the Sass and JavaScript assets
* [ESLint](https://eslint.org/) and [Airbnb's base configuration](https://www.npmjs.com/package/eslint-config-airbnb-base) for linting

## Project structure

```
src/
  _components/
    All UI partials
  _data/
    Eleventy data files
  _includes/
    Code partials
  _layouts/
    Base page layouts
  _pages/
    Each individual page template
  assets/
    css/
      index.scss
      All other scss files
    js/
      index.js
      All other js files
  images/
    All images used
Configuration and build files
```

Files in `assets` will be handled by webpack, Eleventy will transform all of the directories with a leading `_`, and will copy across any `images`.

Eleventy’s output will be to a `dist` directory at the root level.