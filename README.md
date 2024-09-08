# Routines Microservice

## Dev

1. Clonar el repositorio
2. Instalar dependencias con `npm install`
3. Crear un archivo `.env` con las variables de entorno basado en el archivo `.env.template`
4. Levantar la base de datos `docker-compose up -d`
5. ejecutar la migracion `npx prisma migrate dev`
6. Ejecutar el microservicio `npm run start:dev`

"start:dev": "npm run docker:start && nest start --watch",

