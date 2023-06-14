import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

# create DB connection
app = Flask(__name__)
dbpw = os.environ.get('ENT_DB_PW')

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://postgres:{dbpw}@localhost/EntertainMe?options=-c%20search_path=dbo' # set the database URI here
app.app_context().push()

# setup JWT
app.config["JWT_SECRET_KEY"] = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4NDIwODY1NywiaWF0IjoxNjg0MjA4NjU3fQ.8J-0s1IsGyajhivF_p6A0M94RxHWgLyhCVsTyoCUcM4"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
jwt = JWTManager(app)

CORS(app)
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

from routes import create_user, title, home, search, watchlist, recomendations, auth, review

@app.route('/')
def hello():
    return 'Welcome to EntertainMe!'

if __name__ == '__main__':
    app.run()
