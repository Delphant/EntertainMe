# EntertainMe

## Build backend
* Pre-req:
1. Python 3.7 or newer from:
```
https://www.python.org/downloads/
```
2. Install pipenv:
```
pip install pipenv
```
3. Activate pipenv:
```
pipenv shell
```
Note: If you get an error that pipenv is not a command, add this path to your environment variable. Likely 310 as version.
```
C:\Users\{YOUR USER PROFILE NAME}\AppData\Roaming\Python\{PYTHON VER
SION}\Scripts
```

4. Install Required Libraries:
```
pip install flask flask_sqlalchemy psycopg2 flask_cors flask_bcrypt flask-jwt-extended
```

5. Configure DB PWD:
```
[Environment]::SetEnvironmentVariable('ENT_DB_PW', '<DB-PW-GOES-HERE>', 'User')
```

## Run backend
1. Open a Terminal window from the backend directory
2. Run the following command:
```
flask run
```
3. Make application available to other devices on the same network:
```
flask run --host=0.0.0.0
```

## Configure Postman
1. Download Postman:
```
https://www.postman.com/downloads/
```
2. Click Menu --> File --> Import
3. Click Upload Files --> Locate EntertainMe Postman collection
    * Location: entertainme --> backend --> postman --> EntertainMe.postman_collection.json
4. Click Open --> Import
