# Prueba tecnica para Boxful 



## Backend
El backend necesita un par de llaves una pública y una privada para firmar los JWT, 
para que el backend pueda crear los JWT cuando un usuario inicia sesión hay que crear un directorio llamado certs y generarlos con SSL.


### crear certificados

Para desarrollo local es necesario usar los archivo pero una vez el, el proyecto se ponga en produccion este par de llaves deben de configurarse en las variables de entorno, 
para evitar versionar las llaves se han omitido en el archivo `.gitignore`


```bash 
# Generate private key
openssl genrsa -out private.key 2048

# Generate public key from private key
openssl rsa -in private.key -pubout -out public.key

# Get the public key in base 64 format for the frontend
cat public.key | base64 -w 0

cat private.key | base64 -w 0
```


### Variables de entorno
El Backend require de las siguientes configurationes en las variables de ambiente:

```json
{
  "EMAIL_USER": "",
  "EMAIL_PASS": "",
  "EMAIL_PORT": "",
  "EMAIL_HOST": "",
  "MONGODB_URI_DEV": "",
  "DB_NAME": "",
  "PRIVATE_KEY": "",
  "PUBLIC_KEY": ""
}
```


para MacOS y distribuciones de linux se exportan de la siguiente forma:

```bash
export EMAIL_USER="",
export EMAIL_PASS="",
export EMAIL_PORT="465"
export EMAIL_HOST:"sandbox.smtp.mailtrap.io"
export MONGODB_URI_DEV="mongodb+srv://user:password@cluster.gwsit.mongodb.net",
export DB_NAME="technical_interview"

# cat {keyName}.key | base64 -w 0
export PRIVATE_KEY=""
export PUBLIC_KEY=""

```

## Rutas 

```
# Registro
POST http://localhost:5050/auth/user/register
{
  "name": "",
  "lastName": "",
  "gender": "male",
  "email": "",
  "password": "",
  "phone": "",
  "birthdate": ""
}

# Login
POST http://localhost:5050/auth/user/login
{
  "email": "",
  "password": ""
}

# Ordenes
POST http://localhost:5050/delivery/orders
{
    "deliveryAddress": "Final 49 Av Sur y Bulevar Los Próceres, Smartcenter, Bodega #8, San Salvador",
    "directions": "Cerca de redondel Árbol de la Paz",
    "instructions": "Llamar antes de entregar",
    "deliveryDate": "2025-08-03",
    "firstLevel": "Departamento De San Salvador",
    "secondLevel": "Municipio De San Salvador Centro",
    "thirdLevel": null,
    "packages": [
        {
            "length": 383,
            "height": 834,
            "width": 848,
            "content": "3838 dkdk",
            "weight": 38
        }
    ],
    "firstName": "Gabriela Reneé",
    "lastName": "Días López",
    "phone": "7777 7777",
    "email": "gabbydiaz@gmail.com",
    "pickupAddress": "Colonia Las Magnolias, calle militar 1, San Salvador"
}

GET http://localhost:5050/delivery/orders
{
    "orders": [
        {
            "_id": "",
            "deliveryAddress": "",
            "directions": "",
            "instructions": "",
            "deliveryDate": "2025-08-12",
            "firstLevel": "Departamento De San Miguel",
            "secondLevel": "Municipio De San Miguel Centro",
            "thirdLevel": null,
            "packages": [
                {
                    "length": 272,
                    "height": 737,
                    "width": 373,
                    "content": "barillas de hierro",
                    "weight": 373
                }
            ],
            "firstName": " ",
            "lastName": " ",
            "phone": "",
            "email": "",
            "pickupAddress": "",
            "userId": "",
            "createdAt": ""
        }
    ],
    "total": 1,
    "page": 1,
    "totalPages": 2,
    "hasNext": true,
    "hasPrev": false
}


```


En Window es necesario agregarlas a las variables de entorno



## Frontend
Inicie instalando las dependencias con `PNPM` y luego inicie el servidor con `dev`:

para el frontend se ha utilizado shadcn, con Next.js y para las validaciones Zod

```bash
pnpm install
pnpm dev
```

Para desplegar el proyecto se ha utilizado la combinacion de S3 y CloudFont,
S3 es el contenedor para almacenar los archivos estaticos y CloudFront es el CDN

el archivo de configuraciones se encuentra en el directorio

`frontend/src/lib/env-config.ts`
aqui puede cambiar la llave publica y la url del servicio.

Para generar los archivos estaticos se debe de ejecutar el siguiente comando.

Se utiliza un JWT para autorizar al usuario con el Backend y certificar que es quien dice ser. 

El usuario debe de validarse con un codigo otp que le debe de llegar al correo pero como se esta utilizando un servicio llamado mailtrap para hacer llegar los correos a una sandbox se puede apreciar en la captura 9

```bash
 pnpm build  
```

y se generara una carpeta con los archivos estaticos la carpeta se llama `out`


## Infrastructure

Se usa AWS para desplegar el proyecto, para ello se usan los siguientes servicios:

1. S3

2. Lambda

3. Api Gateway

4. CloudFront


## Capturas

| Captura | Descripcion |
|------------|-------------|
| ![1.png](screenshots/1.png) |  Incio de sesion |
| ![2.png](screenshots/2.png) | Registro |
| ![3.png](screenshots/3.png) | Bienvenida |
| ![4.png](screenshots/4.png) | Crear una orden, el boton se activara hasta que se completen los campos |
| ![5.png](screenshots/5.png) | el boton se activo por que se completaron los campos |
| ![6.png](screenshots/6.png) | Agregar productos a una orden de entrega |
| ![7.png](screenshots/7.png) | Se envia la orden al servidor |
| ![8.png](screenshots/8.png) | Historial de envios |
| ![9.png](screenshots/9.png) | Activacion de la cuenta |