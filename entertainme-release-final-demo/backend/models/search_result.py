from app import db

#=============================================================================================================================
# Class --> Search
#
#	Desc:	A class utilized to store user search results
#   Param:  user_id - (int) The id of the user performing the search
#           title_id - (int) The id of the title
#=============================================================================================================================
class Search(db.Model):
    __tablename__ = 'search_result'

    search_result_id = db.Column(db.Integer, primary_key=True)
    user_search_id = db.Column(db.Integer)
    title_id = db.Column(db.Integer)
    insert_date = db.Column(db.DateTime)
    updated_date = db.Column(db.DateTime)

    def __init__(self, user_search_id, title_id):
        self.user_search_id = user_search_id
        self.title_id = title_id
