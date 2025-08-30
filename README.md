## crear certificados

Para configurar el backend se requiere de un par de certificados uno privado y el otro público
estos son necesarios para firmar el JWT y entregarselo al usuario.

### Backend

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

# 
export PRIVATE_KEY=""
export PUBLIC_KEY=""

```

En Window es necesario agregarlas a las variables de entorno



### Frontend

```bash

pnpm dev
```
