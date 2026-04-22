# MF Character Detail

Microfrontend remoto que muestra el detalle de un personaje de Rick & Morty.

## Arquitectura general

Este MFE es un remoto consumido por el MF Shell. Recibe el id del personaje desde la URL y consume la API para mostrar información ampliada.

## Responsabilidades

- Recibe el id del personaje desde el Shell vía la URL (`/character/:id`)
- Muestra información ampliada del personaje
- Lista todos los episodios donde aparece

## Cómo se conecta con el Shell

Este MFE expone su componente en `webpack.config.js`:

```js
exposes: {
  "./CharacterDetailApp": "./src/App.tsx"
}
```

El Shell lo importa dinámicamente:

```js
const CharacterDetailApp = React.lazy(
  () => import("mfCharacterDetail/CharacterDetailApp"),
);
```

## Puerto

- http://localhost:3002

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
