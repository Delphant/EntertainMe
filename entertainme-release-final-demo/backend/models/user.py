from app import db

#=============================================================================================================================
# Class --> User
#
#	Desc:	A class utilized to handle user login
#   Param:  user_first_name - (str) The name of the user
#           user_last_name - (str) The last name of the user
#           user_email_address - (str) The email of the user
#           user_password - (str)
#           user_birth_date - (datetime)
#           user_date_joined - (datetime)
#           user_type - (str)
#           insert_date - (datetime) The date and time of the user account creation
#=============================================================================================================================
class User(db.Model):
    __tablename__ = 'user'

    user_id = db.Column(db.Integer, primary_key=True)
    user_first_name = db.Column(db.String)
    user_last_name = db.Column(db.String)
    user_email_address = db.Column(db.String)
    user_password = db.Column(db.String)
    user_birth_date = db.Column(db.DateTime)
    user_date_joined = db.Column(db.DateTime)
    user_type = db.Column(db.String)
    insert_date = db.Column(db.DateTime)
    updated_date = db.Column(db.DateTime)

    def __init__(self,user_first_name, user_last_name, user_email_address, user_password, user_birth_date, user_date_joined, user_type, insert_date):
        self.user_first_name = user_first_name
        self.user_last_name = user_last_name
        self.user_email_address = user_email_address
        self.user_password = user_password
        self.user_birth_date = user_birth_date
        self.user_date_joined = user_date_joined
        self.user_type = user_type
        self.insert_date = insert_date

    def get_user_fullname(user_id):
        user = User.query.filter_by(user_id=user_id).first()
        return f'{user.user_first_name} {user.user_last_name}'