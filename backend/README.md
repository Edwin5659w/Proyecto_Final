# StyleHub Backend Documentation

## Descripción del Proyecto
StyleHub es una aplicación que permite a los usuarios explorar y compartir estilos de moda. La aplicación está dividida en dos partes: el backend y el frontend. El backend se encarga de la lógica del servidor, la gestión de datos y la comunicación con la base de datos, mientras que el frontend proporciona la interfaz de usuario.

## Instalación

### Requisitos Previos
- Node.js (versión 14 o superior)
- npm (gestor de paquetes de Node.js)
- TypeScript (opcional, pero recomendado para desarrollo)

### Pasos para la Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   cd StyleHub/backend
   ```

2. Copia el archivo de ejemplo de variables de entorno y configúralo:
   ```
   cp .env.example .env
   ```
   - Actualiza `DATABASE_URL` y `JWT_SECRET` en el archivo `.env` según sea necesario.

3. Instala las dependencias:
   ```
   npm install
   ```

4. Genera el cliente de Prisma:
   ```
   npm run prisma:generate
   ```

5. Ejecuta la migración de la base de datos:
   ```
   npm run prisma:migrate
   ```

6. Compila el proyecto TypeScript:
   ```
   npx tsc
   ```

7. Inicia el servidor:
   ```
   npm run dev
   ```

## Uso
Una vez que el servidor esté en funcionamiento, puedes acceder a la API en `http://localhost:3000` (o el puerto que hayas configurado). Utiliza herramientas como Postman o cURL para interactuar con los endpoints de la API.

## Estructura de Archivos

- `src/app.ts`: Punto de entrada de la aplicación.
- `src/controllers/index.ts`: Controladores que manejan la lógica de las rutas.
- `src/models/index.ts`: Modelos de datos utilizados en la aplicación.
- `prisma/schema.prisma`: Esquema de la base de datos.
- `src/routes/index.ts`: Configuración de las rutas de la aplicación.
- `src/types/index.ts`: Tipos e interfaces personalizados.
- `swagger.json`: Documentación de la API en formato Swagger.

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia
Este proyecto está bajo la Licencia MIT.