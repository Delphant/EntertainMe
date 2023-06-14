from app import db

#=============================================================================================================================
# Class --> Latestrecs
#
#	Desc:	A class utilized to access DB View: vw_get_main_titles_watchlist.
#           The view gets the latest 10 recommendations for the specified user
#   Param:  title_id - (int) The id of the title
#           title_name - (int) The name of the title
#           title_description - (str) The description of the title
#           genre_name - (str) The genre name
#           user_id - (int) The id of the user 's watchlist
#=============================================================================================================================
class Latestrecs(db.Model):
    #treat view as table
    __tablename__ = 'vw_get_main_titles_lastrecs'

    title_id = db.Column(db.Integer, primary_key=True)
    title_name = db.Column(db.String)
    title_description = db.Column(db.String)
    genre_name = db.Column(db.String)
    user_id = db.Column(db.Integer)

    def __init__(self, title_id, title_name, title_description, genre_name, user_id):
        self.title_id = title_id
        self.title_name = title_name
        self.title_description = title_description
        self.genre_name = genre_name
        self.user_id = user_id
