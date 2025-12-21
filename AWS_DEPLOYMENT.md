# Guía de Despliegue en AWS

Esta guía proporciona instrucciones paso a paso para desplegar la landing page de Coaching Emocional en AWS usando diferentes servicios.

## Tabla de Contenidos

1. [Opciones de Despliegue](#opciones-de-despliegue)
2. [Opción 1: AWS Amplify (Recomendado - Más Fácil)](#opción-1-aws-amplify)
3. [Opción 2: AWS ECS con Fargate (Containerizado)](#opción-2-aws-ecs-con-fargate)
4. [Opción 3: AWS EC2 (Más Control)](#opción-3-aws-ec2)
5. [Configuración de Dominio y SSL](#configuración-de-dominio-y-ssl)
6. [Integración con AWS SES para Emails](#integración-con-aws-ses)
7. [Monitoreo y Logs](#monitoreo-y-logs)
8. [Costos Estimados](#costos-estimados)

---

## Opciones de Despliegue

### Comparación Rápida

| Servicio | Dificultad | Costo/mes | Escalabilidad | Mantenimiento |
|----------|-----------|-----------|---------------|---------------|
| **AWS Amplify** | Fácil | $15-25 | Auto | Mínimo |
| **ECS Fargate** | Media | $20-40 | Auto | Bajo |
| **EC2** | Alta | $10-50 | Manual | Alto |

---

## Opción 1: AWS Amplify

**Recomendado para**: Despliegues rápidos, equipos pequeños, proyectos que necesitan CI/CD automático.

### Requisitos Previos

- Cuenta de AWS
- Repositorio Git (GitHub, GitLab, Bitbucket)
- Código subido al repositorio

### Pasos

#### 1. Preparar el Repositorio

Asegúrate de que tu código esté en un repositorio Git:

```bash
# Si no has inicializado git
git init
git add .
git commit -m "Initial commit: Landing page coaching emocional"

# Crear repositorio en GitHub y subir
git remote add origin https://github.com/tu-usuario/coaching-landing.git
git branch -M main
git push -u origin main
```

#### 2. Crear Aplicación en Amplify

1. Ingresa a la consola de AWS: https://console.aws.amazon.com
2. Busca "AWS Amplify" en el buscador
3. Click en "Get Started" bajo "Amplify Hosting"
4. Selecciona tu proveedor Git (GitHub, GitLab, etc.)
5. Autoriza el acceso a AWS Amplify
6. Selecciona tu repositorio y branch (main/master)

#### 3. Configurar Build Settings

AWS Amplify detectará automáticamente que es un proyecto Next.js. Verifica que la configuración sea:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

#### 4. Configurar Variables de Entorno

En la sección "Environment variables":

```
NODE_ENV=production
NEXT_PUBLIC_SITE_TITLE=Coaching Emocional Profesional
NEXT_PUBLIC_BASE_URL=https://tu-dominio.amplifyapp.com
CONTACT_EMAIL=contacto@coaching-emocional.com
```

Si usas AWS SES:
```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
```

#### 5. Deploy

1. Click en "Save and deploy"
2. Amplify construirá y desplegará automáticamente
3. Obtendrás una URL tipo: `https://main.d1a2b3c4d5e6f7.amplifyapp.com`

#### 6. Configurar Dominio Personalizado (Opcional)

1. En la consola de Amplify, ve a "Domain management"
2. Click "Add domain"
3. Ingresa tu dominio
4. Sigue las instrucciones para configurar DNS
5. Amplify proveerá SSL automáticamente

### Ventajas de Amplify

- CI/CD automático desde Git
- SSL gratis con AWS Certificate Manager
- Auto-scaling
- Preview de pull requests
- Monitoreo integrado

---

## Opción 2: AWS ECS con Fargate

**Recomendado para**: Aplicaciones containerizadas, necesidad de control sobre infraestructura.

### Requisitos Previos

- AWS CLI instalado
- Docker instalado localmente
- Cuenta de AWS

### Pasos

#### 1. Instalar AWS CLI

**Windows:**
```bash
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
```

**Mac/Linux:**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

Configurar credenciales:
```bash
aws configure
# Ingresa: Access Key ID, Secret Access Key, Region (us-east-1), Output format (json)
```

#### 2. Crear Repositorio ECR (Elastic Container Registry)

```bash
# Crear repositorio
aws ecr create-repository --repository-name coaching-landing --region us-east-1

# Obtener URI del repositorio (guarda este valor)
aws ecr describe-repositories --repository-names coaching-landing --region us-east-1
```

#### 3. Build y Push de Imagen Docker

```bash
# Login a ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

# Build de imagen
docker build -t coaching-landing .

# Tag de imagen
docker tag coaching-landing:latest <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/coaching-landing:latest

# Push a ECR
docker push <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/coaching-landing:latest
```

Reemplaza `<ACCOUNT_ID>` con tu ID de cuenta AWS.

#### 4. Crear Cluster ECS

Desde la consola AWS:

1. Ve a ECS (Elastic Container Service)
2. Click "Create Cluster"
3. Selecciona "Networking only" (Fargate)
4. Nombre: `coaching-landing-cluster`
5. Habilita Container Insights (opcional)
6. Create

#### 5. Crear Task Definition

1. En ECS, ve a "Task Definitions"
2. Click "Create new Task Definition"
3. Selecciona "Fargate"
4. Configuración:
   - Task Definition Name: `coaching-landing-task`
   - Task Role: ninguno (o crea uno si usas AWS SES)
   - Task execution role: ecsTaskExecutionRole
   - Task memory: 512 MB
   - Task CPU: 0.25 vCPU

5. Agregar Container:
   - Container name: `coaching-landing-container`
   - Image: `<ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/coaching-landing:latest`
   - Memory Limits: Soft limit 512
   - Port mappings: 3000 tcp
   - Environment variables: (agrega las variables del .env)

6. Create

#### 6. Crear Service

1. En el cluster, click "Create" en Services
2. Configuración:
   - Launch type: Fargate
   - Task Definition: coaching-landing-task
   - Service name: coaching-landing-service
   - Number of tasks: 1 (o más para alta disponibilidad)
   - Deployment type: Rolling update

3. Configurar red:
   - VPC: Selecciona tu VPC
   - Subnets: Selecciona al menos 2
   - Security group: Crea uno nuevo que permita tráfico en puerto 3000
   - Auto-assign public IP: ENABLED

4. Load balancer (Opcional pero recomendado):
   - Tipo: Application Load Balancer
   - Crea nuevo ALB
   - Listener: HTTP:80 y HTTPS:443
   - Target group: Crea nuevo

5. Create service

#### 7. Configurar Load Balancer (si lo creaste)

1. Ve a EC2 > Load Balancers
2. Selecciona tu ALB
3. Copia el DNS name
4. Tu aplicación estará en: `http://<alb-dns-name>`

---

## Opción 3: AWS EC2

**Recomendado para**: Máximo control, necesidades específicas de configuración.

### Pasos

#### 1. Lanzar Instancia EC2

1. Ve a EC2 en la consola AWS
2. Click "Launch Instance"
3. Configuración:
   - Name: `coaching-landing-server`
   - AMI: Ubuntu Server 22.04 LTS
   - Instance type: t3.micro (o t3.small para mejor performance)
   - Key pair: Crea o selecciona una existente
   - Security group: Permite SSH (22), HTTP (80), HTTPS (443)
   - Storage: 8-16 GB

4. Launch instance

#### 2. Conectar a la Instancia

```bash
# Windows (usa WSL o Git Bash)
ssh -i "tu-key.pem" ubuntu@<EC2-PUBLIC-IP>

# Actualizar sistema
sudo apt update && sudo apt upgrade -y
```

#### 3. Instalar Node.js y Dependencies

```bash
# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar git
sudo apt install -y git

# Instalar PM2 (process manager)
sudo npm install -g pm2
```

#### 4. Clonar y Configurar Proyecto

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/coaching-landing.git
cd coaching-landing

# Instalar dependencias
npm ci --only=production

# Crear archivo .env
nano .env
# Pega las variables de entorno y guarda (Ctrl+X, Y, Enter)

# Build
npm run build
```

#### 5. Ejecutar con PM2

```bash
# Iniciar aplicación
pm2 start npm --name "coaching-landing" -- start

# Configurar PM2 para auto-start
pm2 startup
pm2 save

# Ver logs
pm2 logs coaching-landing
```

#### 6. Configurar Nginx (Opcional pero recomendado)

```bash
# Instalar Nginx
sudo apt install -y nginx

# Configurar Nginx
sudo nano /etc/nginx/sites-available/coaching-landing
```

Contenido del archivo:
```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activar configuración:
```bash
sudo ln -s /etc/nginx/sites-available/coaching-landing /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Configuración de Dominio y SSL

### Con Route 53

1. Ve a Route 53 en AWS
2. Create hosted zone para tu dominio
3. Actualiza los nameservers en tu registrador de dominio
4. Crea un registro A que apunte a:
   - Amplify: Alias al dominio de Amplify
   - ECS: Alias al Application Load Balancer
   - EC2: IP pública de la instancia

### Certificado SSL Gratis con AWS Certificate Manager

1. Ve a AWS Certificate Manager
2. Request certificate
3. Ingresa tu dominio: `coaching-emocional.com` y `*.coaching-emocional.com`
4. Validation method: DNS validation
5. Agrega los registros CNAME a Route 53
6. Espera validación (5-30 minutos)

Para EC2 con Nginx:
```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtener certificado
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# Auto-renovación
sudo systemctl enable certbot.timer
```

---

## Integración con AWS SES

### 1. Verificar Dominio/Email en SES

1. Ve a Amazon SES
2. Verify a new domain o email address
3. Sigue las instrucciones de verificación

### 2. Salir del Sandbox

Por defecto, SES está en sandbox. Para producción:

1. En SES, click "Request Production Access"
2. Completa el formulario justificando el uso
3. Espera aprobación (24-48 horas)

### 3. Crear IAM User para SES

```bash
# Crear usuario
aws iam create-user --user-name ses-smtp-user

# Crear política
cat > ses-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ses:SendRawEmail",
      "Resource": "*"
    }
  ]
}
EOF

# Adjuntar política
aws iam put-user-policy --user-name ses-smtp-user --policy-name SESSendingAccess --policy-document file://ses-policy.json

# Crear access key
aws iam create-access-key --user-name ses-smtp-user
```

Guarda el Access Key ID y Secret Access Key.

### 4. Configurar en la Aplicación

Agrega a `.env`:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=<tu-access-key>
AWS_SECRET_ACCESS_KEY=<tu-secret-key>
```

Instala SDK:
```bash
npm install @aws-sdk/client-ses
```

Actualiza `src/app/api/contact/route.ts` (ejemplo en comentarios del código).

---

## Monitoreo y Logs

### CloudWatch

Para ECS y EC2:

1. Ve a CloudWatch
2. Dashboards > Create dashboard
3. Agrega widgets para:
   - CPU Utilization
   - Memory Utilization
   - Network In/Out
   - HTTP 4xx/5xx errors (si usas ALB)

### CloudWatch Logs

Para EC2:
```bash
# Instalar CloudWatch agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i amazon-cloudwatch-agent.deb

# Configurar
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
```

### Alarmas

Crea alarmas para:
- CPU > 80%
- Memory > 80%
- HTTP 5xx errors > 10 en 5 minutos
- Health check failures

---

## Costos Estimados

### AWS Amplify
- **Build minutes**: $0.01/minuto (primeros 1000 gratis)
- **Hosting**: ~$0.15/GB almacenado + $0.15/GB transferido
- **Estimado mensual**: $15-25 para sitio de tráfico bajo-medio

### ECS Fargate
- **Fargate vCPU**: $0.04048/hora = ~$30/mes
- **Fargate Memory**: $0.004445/GB/hora = ~$3.3/mes (512MB)
- **ALB**: ~$16/mes
- **Data transfer**: Variable
- **Estimado mensual**: $40-60

### EC2
- **t3.micro**: $7.50/mes (750 horas gratis primer año)
- **t3.small**: $15/mes
- **Elastic IP**: Gratis si está en uso
- **Data transfer**: Primeros 100GB gratis
- **Estimado mensual**: $10-20 (con free tier) o $15-30

### Servicios Adicionales
- **Route 53**: $0.50/mes por hosted zone
- **Certificate Manager**: Gratis
- **CloudWatch**: Tier gratis generoso
- **SES**: $0.10 por 1000 emails enviados

---

## Checklist de Producción

Antes de lanzar:

- [ ] Variables de entorno configuradas
- [ ] Dominio configurado y SSL activo
- [ ] SES configurado y verificado
- [ ] Backups automáticos configurados
- [ ] Monitoreo y alarmas activas
- [ ] Logs centralizados
- [ ] Política de escalado definida
- [ ] Pruebas de carga realizadas
- [ ] Plan de recuperación ante desastres
- [ ] Documentación actualizada

---

## Soporte y Troubleshooting

### Problemas Comunes

**Error: "Cannot find module"**
- Verifica que todas las dependencias estén instaladas
- Ejecuta `npm ci` en lugar de `npm install`

**Error 502/503 en ALB**
- Verifica que el security group permita tráfico del ALB al contenedor
- Verifica que la health check apunte a la ruta correcta

**Emails no se envían**
- Verifica que SES no esté en sandbox
- Verifica credenciales IAM
- Revisa CloudWatch Logs para errores

**Alta latencia**
- Considera usar CloudFront CDN
- Optimiza imágenes
- Revisa queries a base de datos (si aplica)

---

## Recursos Adicionales

- [AWS Documentation](https://docs.aws.amazon.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)

---

**Nota Final**: Esta guía cubre los métodos más comunes de despliegue. Dependiendo de tus necesidades específicas, puedes necesitar configuraciones adicionales. Consulta la documentación oficial de AWS para detalles más específicos.
