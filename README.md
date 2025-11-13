# SARAH

El objetivo es una plataforma que reduzca la tasa de suicidio materno en nueva zelanda. Pretende reducir a traves de la automatizacion de envio de tests, la tasa de suicidios de mujeres post-parto.


##  Requisitos previos

Es imprescindible tener instalado lo siguiente:

* **Node.js** (21+)
* **npm** (instalado con Node.js)
* Una instancia de **SQL Server** accesible.

---

##  Instalación y configuración

### 1. Clonar el repositorio e instalar dependencias

Clona el repositorio y luego ejecuta los comandos de instalación de dependencias (en ambas capas): *backend* (`api`) y *frontend* (`web`).

```bash
git clone https://github.com/Arkatros/SARAH.git
cd SARAH
# Comando para instalar dependencias:
cd api && npm i && cd .. && cd web && npm i && cd ..
```

### 1.2. Crear la base de datos y configurar conexión

En SQL server crear la base de datos del proyecto.
Configurar SQL Server para que permita la conexión por IP al puerto 1433:
Habilitar TCP/IP y fijar puerto:
[ ] SQL Server Configuration Manager → Protocols → habilitar TCP/IP.
[ ] En IPAll: borrar “TCP Dynamic Ports” y poner TCP Port = 1433.
[ ] Reiniciar el servicio y abrir el puerto en firewall si aplica.

Generar la cadena de conexión con el siguiente formato:
[ ] "sqlserver://localhost:1433;database={SARAH};user={sa};password={pasword de sa};encrypt=true;trustServerCertificate=true" (prisma, el orm, no soporta Windows Authenticatio, por eso debe ser con user y pass la conection string)

### 2. Configuración de variables de entorno

Crear un archivo `.env` en la carpeta raíz de la api y llenarlo con las siguientes variables.

* **`DATABASE_URL`**: URL de conexión a la base de datos SQL Server.
    * Ejemplo: `DATABASE_URL="sqlserver:HOST:PORT;database=DATABASE;user=USER;password=PASSWORD;encrypt=true;trustServerCertificate=true"`
* **`SECRET_KEY`**: Clave secreta para la generación de tokens de sesión.
    * Ejemplo: `SECRET_KEY = 'clavesecreta'`
* **`GOOGLE_MAIL`**: Dirección de correo de Gmail para el envío de correos.
    * Ejemplo: `GOOGLE_MAIL="Mail@gmail.com"`
* **`GOOGLE_APP_PASS`**: Contraseña de aplicación generada por Google.

### 3. Obtener contraseña de Google Apps

Para obtener una contraseña de Google Apps (**`GOOGLE_APP_PASS`**), se debe tener la verificación de dos pasos de Google activada y luego obtener la llave en el siguiente enlace:

* [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

### 4. Inicializar y seedear la base de datos

Ejecutar el siguiente comando para generar el cliente Prisma, aplicar las migraciones y sembrar la base de datos:

```bash
cd api && npx prisma generate && npx prisma migrate dev && npx prisma db seed
```

## Iniciar aplicación
### Backend (API)

```bash
npm start 
```
### Frontend (Web)

```bash
cd web
npm start
