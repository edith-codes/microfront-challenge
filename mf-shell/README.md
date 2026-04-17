# MF Shell

Microfrontend host que orquesta y renderiza los demás MFEs.

## Responsabilidades

- Provee el layout global (Navbar, Footer)
- Maneja el enrutamiento con React Router
- Carga los MFEs remotos via Module Federation

## Puertos

- Shell: http://localhost:3000

## Tecnologías

- React 18
- TypeScript
- Webpack Module Federation
- React Router DOM
- Tailwind CSS

## Levantar en desarrollo

npm install
npm start

## Levantar con Docker

docker-compose up --build
