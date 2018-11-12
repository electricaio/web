# Electrica Web &middot; [![Build Status](https://travis-ci.com/electricaio/web.svg?token=FMUmapqayPyMpo7S8j31&branch=master)](https://travis-ci.com/electricaio/web) [![Coverage Status](https://coveralls.io/repos/github/electricaio/web/badge.svg?branch=master&t=PqO7AE)](https://coveralls.io/github/electricaio/web?branch=master)

### How to setup

1. Run: `nvm install | nvm use`
1. Run: `npm i` to install the dependencies
1. Run: `cp .env.sample .env` and update the values if needed
1. Run: `npm run start` to run start the application.
1. Start coding!

**Important commands**

Command | Description
--- | ---
`npm run start` | Run application in dev mode
`npm run test` | Run tests
`npm run lint` | Run Typescript linter
`npm run format` | Run Prettier to format you code
`npm run build` | Build app to `/dist/`
`npm run precommit` | Runs formatting, linting and tests to ensure the codebase is in a correct state
**Note:** use `npm run precommit` before committing any changes. 

### Directory Structure

Components - Reusable, simple, generic components (e.g buttons, fonts, and basic layout containers)
Modules - Specific implementations of generic components. Includes container components and connects to the redux store.
Pages - Where all your pages go. Pages should be very plain and only contain a few sub-components that define your pages
Redux - All actions and reducers. The state tree is structured by context. For example `api-keys`, `connector-hub`, `auth`

### Component Library

Ant Design (https://ant.design/docs/react/introduce) is used to build the UI components. Ant design has a large set of high-quality React components out of the box.

## Writing Tests

Electrica uses [Jest](https://facebook.github.io/jest/) as its test runner. Tests reside in colocated `__tests__` folders, and each test file
should match the name of the file it tests, adding a `.test.js` suffix.

### Example Structure

```
  ╰ src
    ╰ modules
      ╰ login
        ╰ __tests__
          ╰ login.test.js
```

For testing React components, [Enzyme](http://airbnb.io/enzyme/) should be used.

### How to build

1. Run: `npm run build` to build the app into `/dist` folder
