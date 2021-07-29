#!/bin/sh

echo "Running docker entrypoint with these arguments: $@"
echo "Current user: $(id)"
echo "Current environment:"
set
echo

if [ "$1" = "coreRest" ]; then
	python manage.py makemigrations
	python manage.py migrate
	python manage.py collectstatic --noinput

	if [ "$2" = "init" ]; then
		echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@example.com', 'pass')" | python manage.py shell
	fi
	
    gunicorn core.wsgi:application --bind 0.0.0.0:8000
fi

exec $@
