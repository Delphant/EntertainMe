from flask import request
from datetime import datetime
from app import app, db, bcrypt
from models.user import User

@app.route('/register', methods = ['POST'])
def register_user():
    # Preps the data needed to create the user record.
    # user_id = request.json['user_id']
    input_first_name = request.json['first']

    input_last_name = request.json['last']

    input_email_address = request.json['email']

    #  Hash the password before creating the account.
    input_password = bcrypt.generate_password_hash(request.json['password']).decode('utf-8')

    input_birth_date =  datetime.now()#request.json['user_birth_date']

    input_date_joined = datetime.now()

    input_type = 'User' # [TODO: Will need to be dynamic.]

    insert_date = datetime.now()

    # Check if user exists. Returns True/False
    query_result = User.query.filter_by(user_email_address = input_email_address).first() is not None

    # If query_result is False, that means the account does not exist. We can move on and create the record.
    if(query_result == False):
        # Create the record
        user = User(input_first_name, input_last_name, input_email_address, input_password, input_birth_date, input_date_joined, input_type, insert_date)
        
        db.session.add(user)
        
        db.session.commit()
        
        return "Account Created!",201
    
    else:
        return "Account already exists under this email.",400
