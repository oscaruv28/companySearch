PROCEDIMIENTO PRUEBA TÉCNICA

1. Creación servicio "companies"

# 1. Crear el package.json
- npm init -y

# 2. Instalar Express y herramientas de producción
- npm install express cors dotenv

# 3. Instalar TypeScript y herramientas de desarrollo (v20+)
- npm install -D typescript @types/node @types/express @types/cors ts-node-dev

2. Configuración e instalación DB

# Dependencias de producción (El core, el driver de Postgres y Reflection)
- npm install @mikro-orm/core @mikro-orm/postgresql @mikro-orm/reflection

# Dependencias de desarrollo (CLI para migraciones y tipos)
- npm install -D @mikro-orm/cli

3. DOCUMENTACIÓN CON SWAGGER INTALACIÓN

- npm install swagger-ui-express swagger-jsdoc
- npm install -D @types/swagger-ui-express @types/swagger-jsdoc

