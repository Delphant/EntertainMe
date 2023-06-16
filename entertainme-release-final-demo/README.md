# Set up process

## Table of Contents
<details>
<summary>Click to expand</summary> 
  
- [Database](#entertainme-database)
- [Backend](#entertainme-backend)
- [Frontend](#entertainme-frontend)


</details>

## EntertainMe! Database

- Pre-req:
- Postgresql 15.0

### Backup database

- Open CMD
- CD to the DB_Scripts folder
- Run the following command:
  ```
  entertainme_backup.cmd
  ```

### Restore a backup

- Unzip the DB_Backups folder
- Open CMD
- CD to the DB_Scripts folder
- Run the following command:
  ```
  entertainme_restore.cmd {file name that you want to restore from DB_Backups folder}
  ```

### Creating DB Objects without doing a backup

- Navigate to the data -> DB_Scripts -> functionality folder
- Open the file of the object (view, function, procedure, etc) and paste it into the SQL editor.
- Execute the script.
- Repeat as needed to create or update the objects.


## EntertainMe! Backend

### Build backend
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
Note: If you get an error that pipenv is not a command, add this path to your environment variable. Likely 310 as a version.
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

### Run backend
1. Open a Terminal window from the backend directory
2. Run the following command:
```
flask run
```
3. Make the application available to other devices on the same network:
```
flask run --host=0.0.0.0
```

### Configure Postman
1. Download Postman:
```
https://www.postman.com/downloads/
```
2. Click Menu --> File --> Import
3. Click Upload Files --> Locate EntertainMe Postman collection
    * Location: entertainme --> backend --> postman --> EntertainMe.postman_collection.json
4. Click Open --> Import


## EntertainMe! Frontend

### Install Dependencies

1. Node.js 18.16.0 LTS

```
https://nodejs.org/en
```

2. CD to frontend in the terminal:

```
cd .\frontend
```

3. Install required packages

```
npm i
```

This should install all the dependencies from the package.json file.

### Run Developer Build

1. Run developer mode

```
npm run dev
```

### Run Build

1. Build the frontend, and creates a local folder 'Dist'

```
npm run build
```

### Run Preview

1. Run the Preview from 'Dist'

```
npm run preview
```

