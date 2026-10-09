# Backend de EDUX

Base de funciones AWS Lambda en Node.js y TypeScript. Por ahora solo incluye
`src/functions/health/handler.ts`, una respuesta mínima para comprobar que el
proyecto compila y que la función se puede invocar. No requiere credenciales AWS.

## Requisitos

- Node.js 22 o posterior
- npm

## Desarrollo local

Desde `backend/`:

```sh
npm ci
npm run dev
```

`dev` recompila TypeScript al guardar cambios. Para validar una versión concreta:

```sh
npm run typecheck
npm run lint
npm run build
node --input-type=module -e "import('./dist/functions/health/handler.js').then(async ({ handler }) => console.log(await handler()))"
```

El último comando debe imprimir una respuesta con `statusCode: 200` y
`{"status":"ok"}` en el cuerpo. La salida compilada se crea en `dist/` y no se
versiona.

Cada futura función puede añadirse bajo `src/functions/<caso-de-uso>/handler.ts`.
La forma exacta de los eventos, el enrutamiento con API Gateway y el despliegue
se definirán cuando se trabaje la infraestructura AWS.
