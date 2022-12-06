#!/bin/bash
#start cronjob
#cron && tail -f /var/log/cron.log 'daemon off;' &
php artisan migrate &
#php artisan passport:install &
php artisan config:clear &
php artisan cache:clear &
php artisan config:cache &
php -S 0.0.0.0:8080 -t public
