FROM php:7.4-cli-buster

RUN apt update -y && apt upgrade -y
RUN apt-get install -y libcurl4-openssl-dev pkg-config libssl-dev

RUN pecl install mongodb && docker-php-ext-enable mongodb

RUN docker-php-ext-install pdo pdo_mysql sockets
RUN curl -sS https://getcomposer.org/installer​ | php -- \
     --install-dir=/usr/local/bin --filename=composer


COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


WORKDIR /app
COPY . .


RUN composer install

