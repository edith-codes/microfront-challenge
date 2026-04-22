# MF Characters

Microfrontend remoto que muestra el listado de personajes de Rick & Morty.

## Arquitectura general

Este MFE es un remoto consumido por el MF Shell. Expone su componente principal a través de Webpack Module Federation y funciona de forma independiente en desarrollo.

## Responsabilidades

- Consume la API de Rick & Morty
- Muestra personajes en grid con paginación
- Permite filtrar por nombre, estado o especie
- Navega al detalle de cada personaje

## Cómo se conecta con el Shell

Este MFE expone su componente en `webpack.config.js`:

```js
exposes: {
  "./CharactersApp": "./src/App.tsx"
}
```

El Shell lo importa dinámicamente:

```js
const CharactersApp = React.lazy(() => import("mfCharacters/CharactersApp"));
```

## Puerto

- http://localhost:3001

## Tecnologías

- React 18
- TypeScript
- Webpack Module Federation
- Tailwind CSS
- Jest + React Testing Library

## Levantar en desarrollo

```bash
npm install
npm start
```

## Correr tests

```bash
npm test
```
