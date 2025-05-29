# Tienda CRUD con Node.js, Express y EJS

Este es un proyecto de práctica creado con Node.js, Express y plantillas EJS. Simula una tienda básica con operaciones CRUD (Crear, Leer, Actualizar y Eliminar) para productos.

Fue desarrollado con fines educativos, y puede ser útil para otros desarrolladores que estén aprendiendo estas tecnologías y quieran ver un ejemplo simple.

## Requisitos 🛠️

Antes de ejecutar este proyecto, asegúrate de tener instalado lo siguiente en tu sistema:

- [Node.js](https://nodejs.org/) (versión recomendada: 18 o superior)
- [npm](https://www.npmjs.com/) (gestor de paquetes que viene con Node)
- [Git](https://git-scm.com/) (opcional, para clonar el proyecto)
- Tailwind CSS CLI v4 (se usa de forma local con `npx`, no es necesario instalarlo globalmente)

## Tecnologías utilizadas ⚙️

- **Node.js** y **Express**: para el backend y las rutas.
- **EJS**: motor de plantillas para renderizar vistas.
- **Tailwind CSS v4**: para estilos rápidos y responsivos usando utilidades.
- **MySQL**: como base de datos para almacenar productos.
- **Multer**: para subir imágenes.
- **Sharp**: para procesar imágenes (por ejemplo, redimensionarlas).
- **bcryptjs**: para el manejo de contraseñas de forma segura.
- **dotenv**: para gestionar variables de entorno.
- **express-session**: manejo de sesiones.
- **express-ejs-layouts**: soporte para layouts en EJS.
- **express-validator**: validaciones del lado del servidor.
- **method-override**: para soportar métodos PUT y DELETE desde formularios HTML.

## Instalación 💻

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tienda-crud.git
   ```
2. Entra al direc
   ```bash
    cd tienda-crud-node-express
   ```
3. Instalar dependencias
   ```bash
    npm install
   ```
4. Copia el archivo de ejemplo `.env.example` como `.env`:
   ```bash
    cp .env.example .env
   ```
5. Configura las variables necesarias en el archivo `.env` según tu entorno.
6. Inicia el proceso de compilación de Tailwind CSS con el siguiente comando:
   ```bash
    npx @tailwindcss/cli -i ./assets/css/input.css -o ./assets/css/app.css --watch
   ```
   Esto compilará los estilos de Tailwind desde tu archivo `input.css` y los dejará listos en `app.css`.
7. En una terminal separada, inicia la aplicación:
   ```bash
    npm run dev
   ```
8. Abre tu navegador en [http://localhost:3000](http://localhost:3000)

### Pasos para importar la base de datos 🧩

1. Crea una base de datos vacía en MySQL (puedes llamarla por ejemplo `tienda`).
2. Importa el contenido del archivo `db.sql` usando tu herramienta favorita (como phpMyAdmin, DBeaver, o por consola):

   ```bash
   mysql -u tu_usuario -p tienda < db.sql
   ```

### Usuario admin por defecto

- **Correo:** `admin@admin.com`
- **Contraseña:** `1234`

## Licencia

Este proyecto está disponible para fines educativos y de práctica. Siéntete libre de usarlo como referencia o base para tus propias ideas.
