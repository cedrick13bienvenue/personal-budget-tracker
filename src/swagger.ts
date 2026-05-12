import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal Budget Tracker API',
      version: '1.0.0',
      description: 'RESTful API for tracking personal income and expenses',
    },
    components: {
      schemas: {
        Transaction: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            amount: { type: 'number', example: 50.0 },
            type: { type: 'string', enum: ['income', 'expense'] },
            category: { type: 'string', example: 'food' },
            description: { type: 'string', example: 'Lunch at cafe' },
            date: { type: 'string', format: 'date', example: '2026-05-12' },
          },
        },
        CreateTransaction: {
          type: 'object',
          required: ['amount', 'type', 'category'],
          properties: {
            amount: { type: 'number', example: 50.0 },
            type: { type: 'string', enum: ['income', 'expense'] },
            category: { type: 'string', example: 'food' },
            description: { type: 'string', example: 'Lunch at cafe' },
            date: { type: 'string', format: 'date', example: '2026-05-12' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
