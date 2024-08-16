import swaggerUi from 'swagger-ui-express';
import { generateOpenApi } from '@ts-rest/open-api';
import contract from 'contract';

const openApiDocument = generateOpenApi(contract, {
  info: {
    title: 'Test API',
    version: '1.0.0',
    description: 'Test API description',
  },
});

export const swaggerMiddleware = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(openApiDocument);
