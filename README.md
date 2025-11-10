# GestiónPark POC

POC de gestión de estacionamiento/cochera construido con React + Vite + TypeScript + Ant Design.

## 🚗 Objetivo
Demostrar un flujo completo de administración y reserva de plazas con dashboards de operador, check-in/out y simulación de cobros.

## 🧱 Stack
- React 18 con Vite y TypeScript.
- Ant Design para componentes UI.
- React Router para navegación.
- Mock services in-memory.

## ▶️ Cómo correrlo
```bash
yarn install
yarn dev
```
- Ambiente local: http://localhost:5173
- Build de producción: `yarn build`
- Vista previa: `yarn preview`

## 🧩 Arquitectura
- Atomic Design: atoms, molecules, organisms.
- Pages organizadas por dominio (Dashboard, Parking, Reservations, Billing, Settings, Auth).
- Servicios mockeados en `src/services` y datos semilla en `src/data/mockData.ts`.
- Router central en `src/router/index.tsx`.

## 📝 Endpoints simulados
- `GET /api/spots`
- `GET /api/reservations`
- `POST /api/reservations`
- `POST /api/checkin`
- `POST /api/checkout`
- `GET /api/payments`

Las funciones en `parkingService` emulan estas rutas con `Promise` y `setTimeout`.

## 🧪 Tests ligeros
Se incluye un smoke test en `src/pages/__tests__/dashboard.test.tsx` (pendiente de implementar en una fase posterior del POC).

## 🚀 Futuras iteraciones sugeridas
- Conectar base de datos real (PostgreSQL + Prisma).
- Integrar pasarela de pago (Stripe, MercadoPago).
- Mapas y visualización de sensores.
- Notificaciones push y webhooks con operadores.
