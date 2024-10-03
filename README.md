
# Proyecto de Despliegue de Aplicación React en AWS, Prueba Tecnica BTG PACTUAL
Prueba Tecnica BTG PACTUAL
Este proyecto contiene una aplicación de React que se despliega en AWS utilizando CloudFormation. A continuación, se presentan los pasos necesarios para preparar y desplegar la aplicación.

LINK DEL FRONT http://btg-bucket.s3-website-us-east-1.amazonaws.com/

## Requisitos Previos

- Tener una cuenta de AWS.
- Tener AWS CLI instalado y configurado.
- Tener Node.js y npm instalados.

## Preparar la Aplicación de React

1. Clona el repositorio:
   ```bash
   git clone <tu-repositorio>
   cd <tu-repositorio>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Construye la aplicación:
   ```bash
   npm run build
   ```

Esto generará una carpeta `build` que contiene la versión optimizada de tu aplicación.

## Subir los Archivos a un Bucket de S3

1. Crea un bucket de S3:
   ```bash
   aws s3 mb s3://nombre-del-bucket
   ```

2. Sube la carpeta `build` a tu bucket de S3:
   ```bash
   aws s3 sync build/ s3://nombre-del-bucket
   ```

## Configurar el Archivo de CloudFormation

Asegúrate de tener un archivo YAML de CloudFormation configurado para crear el bucket de S3 y, opcionalmente, una distribución de CloudFront. Aquí tienes un ejemplo básico:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Despliegue de una aplicación React en S3

Resources:
  MyS3Bucket:
    Type: 'AWS::S3::Bucket'
    Properties:
      BucketName: nombre-del-bucket
      WebsiteConfiguration:
        IndexDocument: index.html
        ErrorDocument: index.html

  S3BucketPolicy:
    Type: 'AWS::S3::BucketPolicy'
    Properties:
      Bucket: !Ref MyS3Bucket
      PolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal: '*'
            Action: 's3:GetObject'
            Resource: !Sub 'arn:aws:s3:::${MyS3Bucket}/*'

Outputs:
  WebsiteURL:
    Description: URL del sitio web
    Value: !GetAtt MyS3Bucket.WebsiteURL
```

## Desplegar la Plantilla de CloudFormation

Puedes desplegar la plantilla de CloudFormation utilizando la consola de AWS o la AWS CLI. Si usas la CLI, el comando sería:

```bash
aws cloudformation create-stack --stack-name nombre-del-stack --template-body file://ruta/a/tu/template.yaml
```

Reemplaza `ruta/a/tu/template.yaml` con la ruta al archivo YAML de tu plantilla.

## Esperar a que se Complete el Despliegue

Puedes comprobar el progreso del despliegue en la consola de CloudFormation o utilizando el siguiente comando:

```bash
aws cloudformation describe-stacks --stack-name nombre-del-stack
```

## Acceder a la Aplicación

Una vez que la pila esté creada con éxito, puedes acceder a tu aplicación en la URL proporcionada en la salida, que se verá algo como esto:

```
http://nombre-del-bucket.s3-website-us-east-1.amazonaws.com
```

## Resumen

Siguiendo estos pasos, deberías poder desplegar tu aplicación de React en AWS utilizando CloudFormation. La clave es crear un bucket de S3, subir los archivos generados y configurar adecuadamente la plantilla de CloudFormation.
