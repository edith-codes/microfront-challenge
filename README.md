# Rick & Morty Microfrontends

Aplicación basada en arquitectura de Microfrontends con Module Federation.

## Estructura

microfront_challenge/
mf-shell/ → Host, layout y enrutamiento
mf-characters/ → Listado de personajes
mf-character-detail/ → Detalle de personaje

## Requisitos

- Node.js 18+
- Docker Desktop

## Levantar con Docker

En la raíz del proyecto:
docker-compose up --build

Acceder en: http://localhost:3000

## Levantar en desarrollo (sin Docker)

En terminales separadas:

cd mf-characters && npm install && npm start
cd mf-character-detail && npm install && npm start
cd mf-shell && npm install && npm start
