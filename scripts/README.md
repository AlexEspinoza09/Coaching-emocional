# Scripts de Automatización

Scripts para facilitar la configuración y mantenimiento de tu aplicación en producción.

## Scripts Disponibles

### 1. setup-ssl.sh

**Propósito:** Automatiza la configuración completa de SSL/HTTPS con Let's Encrypt

**Uso:**
```bash
cd ~/coaching-landing
bash scripts/setup-ssl.sh
```

**Lo que hace:**
1. Verifica que certbot esté instalado
2. Detiene Nginx temporalmente
3. Obtiene certificado SSL de Let's Encrypt
4. Copia certificados al proyecto
5. Actualiza configuración de Nginx
6. Configura renovación automática
7. Proporciona instrucciones finales

**Información que solicita:**
- Nombre de dominio (ej: micoaching.com)
- ¿Incluir www? (s/n)
- Email para notificaciones SSL

**Tiempo estimado:** 5-10 minutos

**Nota:** Después de ejecutar el script, debes descomentar manualmente:
- Sección HTTPS en `nginx/conf.d/default.conf`
- Puerto 443 en `docker-compose.yml`
- Volumen SSL en `docker-compose.yml`

---

### 2. check-setup.sh

**Propósito:** Verifica que toda la configuración del sistema esté correcta

**Uso:**
```bash
cd ~/coaching-landing
bash scripts/check-setup.sh
```

**Lo que verifica:**
1. Docker y Docker Compose instalados
2. Firewall activo y puertos abiertos (22, 80, 443)
3. Contenedores corriendo y saludables
4. Certificados SSL presentes y válidos
5. Configuración de Nginx correcta
6. HTTPS configurado
7. docker-compose.yml actualizado
8. Conectividad (HTTP, HTTPS, health check)
9. Logs sin errores
10. Renovación automática configurada

**Output:** Reporte completo con ✓ (ok) o ✗ (error) para cada verificación

**Tiempo estimado:** 1-2 minutos

**Cuándo usarlo:**
- Después de configurar HTTPS
- Antes de ir a producción
- Para diagnosticar problemas
- Después de actualizar la aplicación

---

## Ejemplos de Uso

### Primer despliegue con HTTPS

```bash
# 1. Desplegar aplicación (sin HTTPS)
docker compose build app
docker compose up -d

# 2. Configurar SSL automáticamente
bash scripts/setup-ssl.sh

# 3. Descomentar configuración HTTPS manualmente
nano nginx/conf.d/default.conf
nano docker-compose.yml

# 4. Reiniciar servicios
docker compose down
docker compose up -d

# 5. Verificar todo
bash scripts/check-setup.sh
```

### Verificación rutinaria

```bash
# Ejecutar cada semana o después de cambios
bash scripts/check-setup.sh
```

### Troubleshooting

```bash
# Si algo no funciona, ejecutar para diagnosticar
bash scripts/check-setup.sh

# Ver output detallado para identificar el problema
```

---

## Permisos de Ejecución

Los scripts deben ser ejecutables. Si no lo son:

```bash
chmod +x scripts/setup-ssl.sh
chmod +x scripts/check-setup.sh
```

---

## Requisitos

### Para setup-ssl.sh:
- Ubuntu Server (o Debian)
- Docker y Docker Compose instalados
- Certbot instalado (el script lo instala si falta)
- Puerto 80 libre (para validación de Let's Encrypt)
- Dominio ya apuntando al servidor (DNS configurado)

### Para check-setup.sh:
- Docker y Docker Compose instalados
- Aplicación ya desplegada
- Acceso a archivos de configuración

---

## Seguridad

- ✅ Los scripts NO modifican contraseñas
- ✅ NO envían datos a terceros
- ✅ Crean backups antes de modificar archivos
- ✅ Usan sudo solo cuando es necesario
- ⚠️ Revisa el código antes de ejecutar si tienes dudas

---

## Backups Automáticos

El script `setup-ssl.sh` crea backups antes de modificar archivos:

```
nginx/conf.d/default.conf.backup
docker-compose.yml.backup
```

Para restaurar un backup:

```bash
# Restaurar configuración de Nginx
cp nginx/conf.d/default.conf.backup nginx/conf.d/default.conf

# Restaurar docker-compose.yml
cp docker-compose.yml.backup docker-compose.yml

# Reiniciar
docker compose down && docker compose up -d
```

---

## Solución de Problemas

### "Permission denied" al ejecutar script

```bash
chmod +x scripts/setup-ssl.sh
chmod +x scripts/check-setup.sh
```

### Script se detiene con error

Revisa el error mostrado. Comunes:

1. **Certbot no instalado:**
   ```bash
   sudo apt install certbot
   ```

2. **Puerto 80 ocupado:**
   ```bash
   # Detener Nginx primero
   docker compose stop nginx
   ```

3. **DNS no configurado:**
   - Verifica que tu dominio apunte a la IP correcta
   - Usa https://dnschecker.org

### Verificación falló

Si `check-setup.sh` muestra errores (✗):

1. Lee el mensaje de error específico
2. Revisa los logs: `docker compose logs nginx`
3. Verifica la configuración manualmente
4. Consulta `PRODUCTION.md` para troubleshooting detallado

---

## Contribuir

Si encuentras bugs o tienes sugerencias:

1. Documenta el problema
2. Incluye el output del script
3. Describe tu configuración (OS, Docker version, etc.)
4. Reporta en el repositorio

---

## Referencias

- **Documentación completa:** Ver `SETUP_DOMINIO_HTTPS.md`
- **Guía rápida:** Ver `QUICK_SETUP.md`
- **Troubleshooting:** Ver `PRODUCTION.md`

---

**Última actualización:** 2025-12-25
