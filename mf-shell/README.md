# MF Shell

Microfrontend host que orquesta y renderiza los demás MFEs usando Webpack Module Federation.

## Arquitectura general

Este proyecto sigue una arquitectura de microfrontends donde cada MFE es una aplicación independiente. El Shell actúa como host y los demás MFEs actúan como remotos:

El Shell carga los MFEs remotos en runtime — no en build time. Cada MFE expone sus componentes a través de Module Federation y el Shell los consume dinámicamente.

## Responsabilidades

- Provee el layout global (Navbar, Footer)
- Maneja el enrutamiento con React Router
- Carga los MFEs remotos via Module Federation

## Cómo se conectan los MFEs

El Shell consume los remotos declarados en `webpack.config.js`:

```js
remotes: {
  mfCharacters: "mfCharacters@http://localhost:3001/remoteEntry.js",
  mfCharacterDetail: "mfCharacterDetail@http://localhost:3002/remoteEntry.js",
}
```

Cada MFE remoto debe estar corriendo antes de levantar el Shell.

## Puertos

| MFE              | Puerto                |
| ---------------- | --------------------- |
| Shell            | http://localhost:3000 |
| Characters       | http://localhost:3001 |
| Character Detail | http://localhost:3002 |

## Tecnologías

- React 18
- TypeScript
- Webpack Module Federation
- React Router DOM
- Tailwind CSS
- Jest + React Testing Library

## Levantar en desarrollo

```bash
npm install
npm start
```

> Asegúrate de que los MFEs remotos estén corriendo primero.

## Levantar con Docker

```bash
docker-compose up --build
```

## Correr tests

```bash
npm test
```
