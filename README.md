# scaffolding-angular20

`scaffolding-angular20` is a starter project for Angular 20 applications, prepared for development, testing, and server-side rendering (SSR) with Angular Universal and Express. It integrates modern building and testing tools, making it ideal for starting robust Angular apps.

## Project Description

This project provides a complete structure for Angular applications, supporting live development, testing, production builds, and SSR with Node.js + Express.

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd scaffolding-angular20
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

### Start in development mode

Spin up an Angular development server:

```bash
npm start
```

The app will be available by default at [http://localhost:4200](http://localhost:4200).

### Build the project

Compile the application for production:

```bash
npm run build
```

The output will be placed in the `dist/` folder.

### Server-Side Rendering (SSR)

Build and serve the SSR version:

```bash
npm run build
npm run serve:ssr:scaffolding-angular20
```

This launches an Express server with Angular rendered on the server side.

### Testing

Run unit tests with Jasmine and Karma:

```bash
npm test
```

### Watch for changes and auto-compile

```bash
npm run watch
```

Automatically recompiles the project in development mode on file changes.

## Library Overview

### Main dependencies (`dependencies`)

- **@angular/core, @angular/common, @angular/forms, @angular/router, etc.:** Core components of the Angular framework for building SPA applications.
- **@angular/material, @angular/cdk:** Material Design components and utilities for building modern UIs.
- **@angular/platform-browser, @angular/platform-server, @angular/ssr:** Enable browser and server-side rendering (SSR) with Angular Universal.
- **rxjs:** Reactive programming and data stream management.
- **express:** Web framework for Node.js, used to serve the SSR application.
- **tslib:** TypeScript runtime library to reduce the size of generated code.
- **zone.js:** Async context tracking, key for Angular's change detection.

### Development dependencies (`devDependencies`)

- **@angular/cli:** Command-line tool for managing, creating, and building Angular projects.
- **@angular/build, @angular/compiler-cli:** Advanced build and compilation tools for Angular.
- **typescript:** The project's base language.
- **@types/node, @types/express, @types/jasmine:** Type definitions to enhance TypeScript development.
- **jasmine-core:** Unit testing framework.
- **karma, karma-chrome-launcher, karma-coverage, karma-jasmine, karma-jasmine-html-reporter:** Tools to run tests in browsers, generate reports, and track coverage.
- **@types/jasmine:** TypeScript types for Jasmine.

## Available Scripts

- `npm start`: Starts the Angular development server.
- `npm run build`: Compiles the app for production.
- `npm run watch`: Compiles and watches for changes in development mode.
- `npm test`: Runs unit tests with Karma + Jasmine.
- `npm run serve:ssr:scaffolding-angular20`: Serves the Angular app rendered on the server with Express.

## Requirements

- Node.js >= 18.x recommended
- npm >= 9.x
- Angular CLI 20.x

## License

Private project. Contact the author for usage permissions.

---
Questions or suggestions? Open an issue or contact the maintainer.