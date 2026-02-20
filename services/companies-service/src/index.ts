// src/index.ts
import { MikroORM } from '@mikro-orm/postgresql';
import { createApp } from './app.js';
import config from './config/mikro-orm.config.js'; // Ruta correcta

const bootstrap = async () => {
  try {
    // 1. Inicializar Mikro-ORM
    const orm = await MikroORM.init(config);
    
    // 2. Sincronización Automática (La solución a tus tablas)
    const generator = orm.getSchemaGenerator();
    
    // Esto asegura que la base de datos y las tablas existan antes de arrancar
    await generator.ensureDatabase(); 
    await generator.updateSchema(); 
    
    console.log('✅ Base de datos sincronizada y tablas listas.');

    // 3. Crear la app
    const app = createApp(orm.em);
    const PORT = process.env.PORT || 3000;
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📄 Swagger: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

bootstrap();