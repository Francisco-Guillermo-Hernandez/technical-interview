## crear certificados

```bash 
# Generate private key
openssl genrsa -out private.key 2048

# Generate public key from private key
openssl rsa -in private.key -pubout -out public.key

```