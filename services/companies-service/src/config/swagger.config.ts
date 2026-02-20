import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerDefinitions } from '../docs/swagger.def.js';

const options: swaggerJSDoc.Options = {
  definition: swaggerDefinitions,
  apis: [],
};

export const specs = swaggerJSDoc(options);