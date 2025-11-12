# SARAH

El objetivo es una plataforma que reduzca la tasa de suicidio materno en nueva zelanda. Pretende reducir a traves de la automatizacion de envio de tests, la tasa de suicidios de mujeres post-parto.


##  Requisitos Previos

Asegúrate de tener instalado lo siguiente:

* **Node.js** (21+)
* **npm** (instalado con Node.js)
* Una instancia de **SQL Server** accesible.

---

##  Instalación y Configuración

### 1. Clonar el Repositorio e Instalación de Dependencias

Clona el repositorio y luego ejecuta los comandos de instalación de dependencias para el *backend* (`api`) y el *frontend* (`web`).

```bash
git clone https://github.com/Arkatros/SARAH.git
cd SARAH
# Comando para instalar dependencias:
cd api && npm i && cd .. && cd web && npm i && cd ..
```

### 2. Configuración de Variables de Entorno

Debes crear un archivo `.env` en la carpeta raíz del proyecto y llenarlo con las siguientes variables.

* **`DATABASE_URL`**: URL de conexión a tu base de datos SQL Server.
    * Ejemplo: `DATABASE_URL="sqlserver:HOST:PORT;database=DATABASE;user=USER;password=PASSWORD;encrypt=true;trustServerCertificate=true"`
* **`SECRET_KEY`**: Clave secreta para la generación de tokens de sesión.
    * Ejemplo: `SECRET_KEY = 'clavesupermegasecreta'`
* **`GOOGLE_MAIL`**: Dirección de correo de Gmail para el envío de correos.
    * Ejemplo: `GOOGLE_MAIL="Mail@gmail.com"`
* **`GOOGLE_APP_PASS`**: Contraseña de aplicación generada por Google.

### 3. Obtener Contraseña de Google Apps

Para conseguir tu contraseña de Google Apps (**`GOOGLE_APP_PASS`**), tenés que tener la verificación de dos pasos de Google activada y luego obtenés tu llave en el siguiente enlace:

* [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

### 4. Inicializar y Seedear la Base de Datos

Ejecuta el siguiente comando para generar el cliente Prisma, aplicar las migraciones y sembrar la base de datos:

```bash
cd api && npx prisma generate && npx prisma migrate dev && npx prisma db seed
```
## Iniciar Aplicación
### Iniciar el Backend (API)

```bash
cd api
npm run start 
```
### Iniciar el Frontend (Web)

```bash
cd web
npm start
