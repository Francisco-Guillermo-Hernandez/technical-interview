# Prueba tecnica para Boxful 



## Backend
El backend necesita un par de llaves una pública y una privada para firmar los JWT, 
para que el backend pueda crear los JWT cuando un usuario inicia sesión hay que crear un directorio llamado certs y generarlos con SSL.


### crear certificados

Para configurar el backend se requiere de un par de certificados uno privado y el otro público
estos son necesarios para firmar el JWT y entregarselo al usuario.



```bash 
# Generate private key
openssl genrsa -out private.key 2048

# Generate public key from private key
openssl rsa -in private.key -pubout -out public.key

# Get the public key in base 64 format for the frontend
cat public.key | base64 -w 0

cat private.key | base64 -w 0
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
  "deliveryAddress": "",
  "directions": "",
  "guideMark": "",
  "firstLevel": "",
  "secondLevel": "",
  "thirdLevel": "",
  "packages": [
    {
      "length": 10,
      "height": 5,
      "width": 8,
      "content": "Electronics",
      "weight": 2.5
    }
  ]
}



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

# 
export PRIVATE_KEY=""
export PUBLIC_KEY=""

```

En Window es necesario agregarlas a las variables de entorno



## Frontend
Inicie instalando las dependencias con `PNPM` y luego inicie el servidor con `dev`:

```bash
pnpm install
pnpm dev
```


## Infrastructure

Se usa AWS para desplegar el proyecto, para ello se usan los siguientes servicios:

1. S3

2. Lambda

3. Api Gateway

4. CloudFront
