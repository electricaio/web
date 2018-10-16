# Electrica Web &middot; [![Build Status](https://travis-ci.com/electricaio/web.svg?token=FMUmapqayPyMpo7S8j31&branch=master)](https://travis-ci.com/electricaio/web) [![Coverage Status](https://coveralls.io/repos/github/electricaio/web/badge.svg?branch=master&t=PqO7AE)](https://coveralls.io/github/electricaio/web?branch=master)

### How to setup

1. Run: nvm install | nvm use
1. Run: npm i to install the dependencies
1. Run: npm run start to run start the application. The browser should automatically open at http://localhost:3000
1. Start coding!

### Directory Structure

Components - Reusable, simple, generic components (e.g buttons, fonts, and basic layout containers)
Modules - Specific implementations of generic components. Includes container components, redux actions/reducers.
Pages - Where all your pages go. Pages should be very plain and only contain a few sub-components including layouts

### Component Library

Ant Design (https://ant.design/docs/react/introduce) is used to build the UI components. Ant design has a large set of high-quality React components out of the box.


### How to build

1.  Run: `npm run build` to build website into `/public` folder