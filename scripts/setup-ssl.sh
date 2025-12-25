#!/bin/bash

#################################################
# Script de Configuración SSL para Coaching Landing
# Automatiza la configuración de HTTPS con Let's Encrypt
#################################################

set -e  # Salir si hay error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sin color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Configuración SSL - Coaching Landing${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 1. Solicitar información
echo -e "${YELLOW}Por favor, proporciona la siguiente información:${NC}"
echo ""

read -p "Nombre de dominio (ej: micoaching.com): " DOMAIN
read -p "¿Incluir www? (s/n): " INCLUDE_WWW
read -p "Email para notificaciones SSL: " EMAIL

# Construir lista de dominios
DOMAINS="-d $DOMAIN"
if [ "$INCLUDE_WWW" = "s" ] || [ "$INCLUDE_WWW" = "S" ]; then
    DOMAINS="$DOMAINS -d www.$DOMAIN"
fi

echo ""
echo -e "${GREEN}Configuración:${NC}"
echo "Dominio: $DOMAIN"
echo "Incluir www: $INCLUDE_WWW"
echo "Email: $EMAIL"
echo ""

read -p "¿Continuar? (s/n): " CONFIRM
if [ "$CONFIRM" != "s" ] && [ "$CONFIRM" != "S" ]; then
    echo -e "${RED}Cancelado por el usuario${NC}"
    exit 1
fi

# 2. Verificar que certbot está instalado
echo ""
echo -e "${YELLOW}[1/7] Verificando certbot...${NC}"
if ! command -v certbot &> /dev/null; then
    echo -e "${RED}Certbot no está instalado${NC}"
    echo "Instalando certbot..."
    sudo apt update
    sudo apt install -y certbot
else
    echo -e "${GREEN}✓ Certbot ya está instalado${NC}"
fi

# 3. Detener Nginx
echo ""
echo -e "${YELLOW}[2/7] Deteniendo Nginx temporalmente...${NC}"
docker compose stop nginx
echo -e "${GREEN}✓ Nginx detenido${NC}"

# 4. Obtener certificado SSL
echo ""
echo -e "${YELLOW}[3/7] Obteniendo certificado SSL...${NC}"
sudo certbot certonly --standalone \
    $DOMAINS \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Certificado obtenido exitosamente${NC}"
else
    echo -e "${RED}✗ Error al obtener certificado${NC}"
    docker compose up -d nginx
    exit 1
fi

# 5. Copiar certificados al proyecto
echo ""
echo -e "${YELLOW}[4/7] Copiando certificados al proyecto...${NC}"

# Crear directorio SSL si no existe
mkdir -p nginx/ssl

# Copiar certificados
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem nginx/ssl/key.pem

# Ajustar permisos
sudo chown -R $USER:$USER nginx/ssl
chmod 644 nginx/ssl/cert.pem
chmod 600 nginx/ssl/key.pem

echo -e "${GREEN}✓ Certificados copiados${NC}"

# 6. Actualizar configuración de Nginx
echo ""
echo -e "${YELLOW}[5/7] Actualizando configuración de Nginx...${NC}"

# Hacer backup de la configuración actual
cp nginx/conf.d/default.conf nginx/conf.d/default.conf.backup

# Reemplazar server_name en la configuración
sed -i "s/server_name localhost;/server_name $DOMAIN www.$DOMAIN;/g" nginx/conf.d/default.conf

echo -e "${GREEN}✓ Configuración actualizada${NC}"
echo -e "${YELLOW}IMPORTANTE: Debes descomentar manualmente la sección HTTPS en nginx/conf.d/default.conf${NC}"

# 7. Actualizar docker-compose.yml
echo ""
echo -e "${YELLOW}[6/7] Actualizando docker-compose.yml...${NC}"

# Hacer backup
cp docker-compose.yml docker-compose.yml.backup

echo -e "${GREEN}✓ Backup creado${NC}"
echo -e "${YELLOW}IMPORTANTE: Debes descomentar manualmente:${NC}"
echo "  - Puerto 443 en docker-compose.yml"
echo "  - Volumen SSL en docker-compose.yml"
echo "  - Sección HTTPS en nginx/conf.d/default.conf"

# 8. Configurar renovación automática
echo ""
echo -e "${YELLOW}[7/7] Configurando renovación automática...${NC}"

RENEW_SCRIPT="/etc/cron.daily/certbot-renew"
PROJECT_DIR="$(pwd)"

sudo tee $RENEW_SCRIPT > /dev/null <<EOF
#!/bin/bash

# Renovar certificados
certbot renew --quiet

# Si se renovaron, copiar y reiniciar
if [ \$? -eq 0 ]; then
    cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem $PROJECT_DIR/nginx/ssl/cert.pem
    cp /etc/letsencrypt/live/$DOMAIN/privkey.pem $PROJECT_DIR/nginx/ssl/key.pem

    chown $USER:$USER $PROJECT_DIR/nginx/ssl/*.pem
    chmod 644 $PROJECT_DIR/nginx/ssl/cert.pem
    chmod 600 $PROJECT_DIR/nginx/ssl/key.pem

    cd $PROJECT_DIR
    docker compose restart nginx
fi
EOF

sudo chmod +x $RENEW_SCRIPT

echo -e "${GREEN}✓ Renovación automática configurada${NC}"

# Resumen final
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  ¡Configuración completada!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Pasos siguientes:${NC}"
echo ""
echo "1. Editar nginx/conf.d/default.conf:"
echo "   - Descomentar la sección HTTPS (línea ~60)"
echo "   - Verificar que server_name sea: $DOMAIN www.$DOMAIN"
echo ""
echo "2. Editar docker-compose.yml:"
echo "   - Descomentar: - \"443:443\""
echo "   - Descomentar: - ./nginx/ssl:/etc/nginx/ssl:ro"
echo ""
echo "3. Reiniciar servicios:"
echo "   docker compose down"
echo "   docker compose up -d"
echo ""
echo "4. Verificar en el navegador:"
echo "   https://$DOMAIN"
echo ""
echo -e "${GREEN}Archivos de backup creados:${NC}"
echo "   - nginx/conf.d/default.conf.backup"
echo "   - docker-compose.yml.backup"
echo ""
echo -e "${GREEN}Certificados ubicados en:${NC}"
echo "   - nginx/ssl/cert.pem"
echo "   - nginx/ssl/key.pem"
echo ""
echo -e "${YELLOW}Para probar la renovación automática:${NC}"
echo "   sudo certbot renew --dry-run"
echo ""
