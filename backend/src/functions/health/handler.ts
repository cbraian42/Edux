import type { APIGatewayProxyResultV2 } from 'aws-lambda';

/** Respuesta mínima para comprobar que la función puede ejecutarse en Lambda. */
export async function handler(): Promise<APIGatewayProxyResultV2> {
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ status: 'ok' }),
  };
}
