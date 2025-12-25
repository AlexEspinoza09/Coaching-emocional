#!/bin/bash

#################################################
# Script de Verificación - Coaching Landing
# Verifica que todo esté configurado correctamente
#################################################

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Verificación de Configuración${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Función para verificar
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $1${NC}"
        return 0
    else
        echo -e "${RED}✗ $1${NC}"
        return 1
    fi
}

# 1. Verificar Docker
echo -e "${YELLOW}[1] Verificando Docker...${NC}"
docker --version &> /dev/null
check "Docker instalado"

docker compose version &> /dev/null
check "Docker Compose instalado"

# 2. Verificar Firewall
echo ""
echo -e "${YELLOW}[2] Verificando Firewall...${NC}"
sudo ufw status | grep -q "Status: active"
check "Firewall activo"

sudo ufw status | grep -q "80/tcp.*ALLOW"
check "Puerto 80 abierto"

sudo ufw status | grep -q "443/tcp.*ALLOW"
check "Puerto 443 abierto"

# 3. Verificar Contenedores
echo ""
echo -e "${YELLOW}[3] Verificando Contenedores...${NC}"
docker compose ps | grep -q "coaching-landing-app.*Up"
check "Contenedor app corriendo"

docker compose ps | grep -q "coaching-landing-nginx.*Up"
check "Contenedor nginx corriendo"

docker compose ps | grep -q "healthy"
check "Health checks pasando"

# 4. Verificar Certificados SSL
echo ""
echo -e "${YELLOW}[4] Verificando Certificados SSL...${NC}"

if [ -f "nginx/ssl/cert.pem" ]; then
    check "Certificado SSL existe"

    # Verificar expiración
    EXPIRY=$(openssl x509 -enddate -noout -in nginx/ssl/cert.pem 2>/dev/null | cut -d= -f2)
    if [ ! -z "$EXPIRY" ]; then
        echo -e "   ${GREEN}Expira: $EXPIRY${NC}"
    fi
else
    echo -e "${RED}✗ Certificado SSL no encontrado${NC}"
fi

if [ -f "nginx/ssl/key.pem" ]; then
    check "Clave privada SSL existe"

    # Verificar permisos
    PERMS=$(stat -c "%a" nginx/ssl/key.pem 2>/dev/null)
    if [ "$PERMS" = "600" ]; then
        check "Permisos de clave privada correctos (600)"
    else
        echo -e "${RED}✗ Permisos incorrectos: $PERMS (debe ser 600)${NC}"
    fi
else
    echo -e "${RED}✗ Clave privada SSL no encontrada${NC}"
fi

# 5. Verificar Configuración de Nginx
echo ""
echo -e "${YELLOW}[5] Verificando Configuración de Nginx...${NC}"

if [ -f "nginx/conf.d/default.conf" ]; then
    check "Configuración de Nginx existe"

    # Verificar HTTPS configurado
    if grep -q "listen 443 ssl http2" nginx/conf.d/default.conf && ! grep -q "^#.*listen 443 ssl http2" nginx/conf.d/default.conf; then
        check "HTTPS configurado en Nginx"
    else
        echo -e "${YELLOW}⚠ HTTPS no configurado o comentado${NC}"
    fi

    # Verificar dominio configurado
    if grep -q "server_name.*localhost" nginx/conf.d/default.conf; then
        echo -e "${YELLOW}⚠ Dominio todavía es 'localhost'${NC}"
    else
        DOMAIN=$(grep "server_name" nginx/conf.d/default.conf | head -1 | awk '{print $2}' | tr -d ';')
        echo -e "   ${GREEN}Dominio: $DOMAIN${NC}"
    fi
else
    echo -e "${RED}✗ Configuración de Nginx no encontrada${NC}"
fi

# 6. Verificar docker-compose.yml
echo ""
echo -e "${YELLOW}[6] Verificando docker-compose.yml...${NC}"

if grep -q '"443:443"' docker-compose.yml && ! grep -q '#.*"443:443"' docker-compose.yml; then
    check "Puerto 443 expuesto"
else
    echo -e "${YELLOW}⚠ Puerto 443 no expuesto o comentado${NC}"
fi

if grep -q './nginx/ssl:/etc/nginx/ssl' docker-compose.yml && ! grep -q '#.*./nginx/ssl:/etc/nginx/ssl' docker-compose.yml; then
    check "Volumen SSL montado"
else
    echo -e "${YELLOW}⚠ Volumen SSL no montado o comentado${NC}"
fi

# 7. Verificar Conectividad
echo ""
echo -e "${YELLOW}[7] Verificando Conectividad...${NC}"

# Health check
curl -s http://localhost/health &> /dev/null
check "Health check respondiendo"

# HTTP
curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200\|301"
check "HTTP respondiendo"

# HTTPS (si está configurado)
if curl -s -k https://localhost &> /dev/null; then
    check "HTTPS respondiendo"
fi

# 8. Verificar Logs
echo ""
echo -e "${YELLOW}[8] Verificando Logs...${NC}"

NGINX_ERRORS=$(docker compose logs nginx 2>&1 | grep -i error | wc -l)
if [ $NGINX_ERRORS -eq 0 ]; then
    check "Sin errores en logs de Nginx"
else
    echo -e "${YELLOW}⚠ $NGINX_ERRORS errores en logs de Nginx${NC}"
fi

APP_ERRORS=$(docker compose logs app 2>&1 | grep -i error | wc -l)
if [ $APP_ERRORS -eq 0 ]; then
    check "Sin errores en logs de App"
else
    echo -e "${YELLOW}⚠ $APP_ERRORS errores en logs de App${NC}"
fi

# 9. Verificar Renovación Automática
echo ""
echo -e "${YELLOW}[9] Verificando Renovación Automática...${NC}"

if [ -f "/etc/cron.daily/certbot-renew" ]; then
    check "Script de renovación existe"

    if [ -x "/etc/cron.daily/certbot-renew" ]; then
        check "Script de renovación es ejecutable"
    else
        echo -e "${RED}✗ Script no es ejecutable${NC}"
    fi
else
    echo -e "${YELLOW}⚠ Script de renovación no configurado${NC}"
fi

# Resumen Final
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Resumen${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Conteo de checks
echo -e "${YELLOW}Comandos útiles:${NC}"
echo ""
echo "Ver logs en tiempo real:"
echo "  docker compose logs -f nginx"
echo "  docker compose logs -f app"
echo ""
echo "Reiniciar servicios:"
echo "  docker compose restart nginx"
echo "  docker compose restart app"
echo ""
echo "Ver certificados SSL:"
echo "  sudo certbot certificates"
echo ""
echo "Probar renovación SSL:"
echo "  sudo certbot renew --dry-run"
echo ""
echo "Ver estado de contenedores:"
echo "  docker compose ps"
echo ""
