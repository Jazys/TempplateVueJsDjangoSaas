# TempplateVueJsDjangoSaas

After cloning repo, enter it, and use dos2unix (sure file can be read by linux system)
```
dos2unix *.* && dos2unix backend/*.*

```

## Django Rest Api Backend

For using in no docker environnement : \
Install python3 and pip3. \
Run pip3 install -r requirements.txt to install dependencies

```
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser (and follow instructions)

For running, python manage.py runserver 0.0.0.0
```

## VueJS frontend

For using in no docker environnement :
```
Install npm
npm install @vue/cli@3.7.0 -g (to use vuecli)
npm install -i (to install all dependencies)
```


## Next steps
- use docker for debug and production environnement
- use VM for ready code plateform
- add test in django
- add somes features
