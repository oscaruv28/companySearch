export const swaggerDefinitions = {
    openapi: '3.0.0',
    info: {
        title: 'Companies Service API',
        version: '1.0.0',
        description: 'API para la validación y registro de empresas',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor Local',
        },
    ],
    paths: {
        '/api/companies/validate/{nit}': {
            get: {
                summary: 'Valida un NIT de empresa',
                tags: ['Companies'],
                parameters: [
                    {
                        in: 'path',
                        name: 'nit',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    200: { description: 'OK' },
                },
            },
        },
        '/api/companies/register': {
            post: {
                summary: 'Registro de empresa',
                tags: ['Companies'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/RegisterCompanyDto'
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Creado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ApiResponse' }
                            }
                        }
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            RegisterCompanyDto: {
                type: 'object',
                required: ['tipoIdentificacion', 'nit', 'email'],
                properties: {
                    tipoIdentificacion: { type: 'string', example: 'NIT' },
                    nit: { type: 'string', example: '900674336', description: 'Solo números' },
                    razonSocial: { type: 'string', example: 'Teleperformance' },
                    primerNombre: { type: 'string' },
                    primerApellido: { type: 'string' },
                    email: { type: 'string', format: 'email', example: 'dev@tp.com' },
                    autorizaCelular: { type: 'boolean', default: false },
                    autorizaEmail: { type: 'boolean', default: false }
                }
            },
            ApiResponse: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    code: { type: 'string', example: '0' },
                    message: { type: 'string' },
                    data: { type: 'object', nullable: true }
                }
            }
        }
    }
};