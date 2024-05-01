# About

Repository contains three tests for website https://www.allegro.pl/. Tests are just example and will not work on production environment due to the captcha functionality.

## Installation

- clone repository
- type following commands in the project folder:

```bash
npm install cypress@latest
```
```bash
npm install --save-dev typescript
```
```bash
npx cypress open
```
or
```bash
npx cypress run
```

## Technology

- Cypress
- JavaScript / TypeScript

Created Cypress Env file, sample:
{
  "BASE_URL": "https://www.allegro.pl/",
  "PASSWORD": "Test1234!!!b",
  "User": "Reinaldo"
}
