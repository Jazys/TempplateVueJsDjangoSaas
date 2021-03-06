# TempplateVueJsDjangoSaas

After cloning repo, enter it, and use dos2unix (sure file can be read by linux system)
```
dos2unix *.* && dos2unix backend/*.*

```

## Django Rest Api Backend

For using in no docker environnement : \
Install python3 and pip3. \
Run pip3 install -r requirements.txt to install dependencies \

Modify the list of IP authorize for using API from Front (or other)\
Edit backend/core/settings.py and modify or add IP

```
CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:8080", "http://@IP:PORT"
]
```

Prepare and run backend :
```
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser (and follow instructions)

For running, python3 manage.py runserver 0.0.0.0:8000
```

## VueJS frontend

For using in no docker environnement : \
Install npm 

```
npm install @vue/cli@3.7.0 -g (to use vuecli)
npm install -i (to install all dependencies)

echo "VUE_APP_API_ENDPOINT=http://@IP:8000" > .env (use for communicating with backend)

npm run test (for launching front)

```

## Developpment environnement with Docker

Make sure your backend settings are configured. (change CORS_ALLOWED_ORIGINS with your frontend web adress) \
In frontend src, edit config/config.js file for setting URL backend \
Make sure you are installed Docker and Docker-compose. \
In docker-compose-debug.yml file change the path of your directory (volume section)

```
docker-compose -f docker-compose-debug.yml up  (use -d for detach)
```

By default, the login/password of default admin user is admin/pass. (change in entrypoint.sh)
It will running in debug, so you can see stack trace of error in web page.

## Production environnement with Docker

Make sure your backend settings_prod are configured. (change CORS_ALLOWED_ORIGINS with your frontend web adress) \
In frontend src, edit config/config.js file for setting URL backend \
Make sure you are installed Docker and Docker-compose. \
Create in backend dir, media and static dir and app/migrations. They will be share in the docker \
In docker-compose.yml file change the path of your directory (volume section backend and frontend)

```
docker-compose up  (use -d for detach)
```

By default, the login/password of default admin user is admin/pass. (change in entrypoint_prod.sh)
No stack, error 404 when the ressource was not found for example.

## Next steps
- use VM for ready code plateform
- add test in django
- add somes features
- PWA
