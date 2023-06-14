from flask import request, jsonify, current_app
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt, get_jwt_identity, jwt_required, unset_jwt_cookies

from app import app, bcrypt, db
from models.user import User

#=============================================================================================================================
# Function --> format_result
#	Desc:	    Format query results as JSON objects using key/value pair mechanism
#   Param:      type - (str) the type of data being parsed
#               data - (list) holds a list of the Class name and primary key i.e.: <Title 23342>
#
#   Return:     Returns data in JSON format.
#=============================================================================================================================
def format_result(type, data):
    match type:
        case "profile":
            return {
                "first_name": data.user_first_name,
                "last_name": data.user_last_name
            }
        case _:
            return "Unhandled return type!!"
            
#=============================================================================================================================
# Route --> /token
#
#	Desc:	    Creates a token if user successfully authenticates, if incorrect creadentials, return a 401 error.
#   Param:      N/A
#   Called by:  Frontend login page
#=============================================================================================================================
@app.route('/token', methods=["POST"])
def create_token():
    user_email = request.json['email']
    user_pwd = request.json['password']

    # Check if email is already on DB
    user = User.query.filter_by(user_email_address = user_email).first()

    #Check if user exists, check if pw is valid
    if user and bcrypt.check_password_hash(user.user_password, user_pwd):
        # create access token and return it to frontend
        access_token = create_access_token(identity=user_email)
        refresh_token = create_refresh_token(identity=user_email)

        # get access token expiration in minutes from app configuration 
        access_token_exp = current_app.config["JWT_ACCESS_TOKEN_EXPIRES"].total_seconds() / 60
        # get refresh token expiration in minutes from app configuration 
        refresh_token_exp = current_app.config["JWT_REFRESH_TOKEN_EXPIRES"].total_seconds() / 60
    

        user_id = user.user_id

        response = {"user_id": user_id, "access_token": access_token, "refresh_token": refresh_token, "access_token_exp": access_token_exp, "refresh_token_exp": refresh_token_exp}
        return response, 201
    else:
        return "Wrong email or password", 401

#=============================================================================================================================
# Route --> /profile
#
#	Desc:	    Get user profile info based on user ID provided by frontend.
#   Param:      N/A
#   Called by:  Frontend applicaiton
#=============================================================================================================================
@app.route('/profile', methods=["GET"])
@jwt_required() # prevent unauthenticated users from making requests to the API endpoint
def my_profile():
    user_id = request.headers['userid']

    # get user details
    user = User.query.filter_by(user_id = user_id).first()
    
    return {'user_profile': format_result("profile", user)}, 200
    
#=============================================================================================================================
# Route --> /forgotpassword
#
#	Desc:	    Resets user password, if email exists.
#   Param:      N/A
#   Called by:  Frontend applicaiton
#=============================================================================================================================
@app.route('/forgotpassword', methods=["POST"])
def reset_password():
    user_email = request.json['email']

    # Check if email is already on DB
    user = User.query.filter_by(user_email_address = user_email).first()

    #Check if user exists, update pw
    if user:
        #  Hash the password before creating the account.
        input_password = bcrypt.generate_password_hash(request.json['password']).decode('utf-8')

       # Update user pw
        user.user_password = input_password
        db.session.commit()

        return "User password updated!", 201
    else:
        return "No user registered with this email", 401

#=============================================================================================================================
# Route --> /refreshtoken
#
#	Desc:	    Refreshes token, it not expired..
#   Param:      N/A
#   Called by:  Frontend applicaiton
#=============================================================================================================================
@app.route("/refreshtoken", methods=["POST"])
@jwt_required(refresh=True) # prevent unauthenticated users from making requests to the API endpoint
def refresh_token():
    current_user = get_jwt_identity()
    # get token expiration in minutes from app configuration 
    access_token_exp = current_app.config["JWT_ACCESS_TOKEN_EXPIRES"].total_seconds() / 60

    ret = {
        'access_token': create_access_token(identity=current_user),
        'access_token_exp': access_token_exp
    }
    return jsonify(ret), 200
    
    
#UNDER DEVELOPMENT  
@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify("logout successful")
    unset_jwt_cookies(response)
    return response, 201
