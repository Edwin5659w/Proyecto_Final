# StyleHub

StyleHub es un proyecto diseñado para proporcionar una plataforma de estilo y moda en línea. Este documento proporciona una visión general del proyecto, así como instrucciones sobre cómo instalar y utilizar la aplicación.

## Propósito

El objetivo de StyleHub es ofrecer a los usuarios una experiencia única para explorar y compartir estilos de moda. La aplicación permite a los usuarios navegar por diferentes estilos, guardar sus favoritos y compartir sus propias creaciones.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales: **backend** y **frontend**.

- **backend**: Implementado en TypeScript, utiliza Express y Prisma para manejar la lógica del servidor y la interacción con la base de datos.
- **frontend**: Construido con Vue.js y Vite, proporciona una interfaz de usuario interactiva y receptiva.

## Instalación

Para instalar y ejecutar el proyecto, sigue estos pasos:

1. Clona el repositorio:
   ```
   git clone <URL del repositorio>
   cd StyleHub
   ```

2. Instala las dependencias del backend:
   ```
   cd backend
   npm install
   ```

3. Instala las dependencias del frontend:
   ```
   cd ../frontend
   npm install
   ```

4. Configura la base de datos en el archivo `backend/src/prisma/schema.prisma` según tus necesidades.

5. Ejecuta el servidor backend:
   ```
   cd backend
   npm start
   ```

6. Ejecuta la aplicación frontend:
   ```
   cd ../frontend
   npm run dev
   ```

## Uso

Una vez que el servidor y la aplicación frontend estén en funcionamiento, puedes acceder a la aplicación a través de tu navegador en `http://localhost:3000` (o el puerto que hayas configurado).

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir al proyecto, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.