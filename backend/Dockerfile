# Usar la imagen oficial de PHP con FPM
FROM php:8.2-fpm

# Instalar extensiones de PHP requeridas por Laravel
RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Copiar archivos del proyecto al contenedor
COPY . .

# Instalar dependencias de Composer y generar clave de la aplicación
RUN composer install --no-interaction --prefer-dist --optimize-autoloader && \
    php artisan key:generate

# Establecer permisos
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Exponer el puerto 9000 para PHP-FPM
EXPOSE 9000

CMD ["php-fpm"]