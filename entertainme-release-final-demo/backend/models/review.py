from app import db

#=============================================================================================================================
# Class --> Review
#
#	Desc:	A class utilized to handle user watchlist
#   Param:  user_review_rating - (int) The number of starts given on the review
#           user_review_description - (str) The review provided by the user
#           user_id - (int) The id of the user's watchlist
#           title_id - (int) The id of the title
#           insert_date - (datetime) The date and time of the title entry to watchlist
#=============================================================================================================================
class Review(db.Model):
    __tablename__ = 'user_review'

    user_review_id = db.Column(db.Integer, primary_key=True)
    user_review_rating = db.Column(db.Integer)
    user_review_title = db.Column(db.String)
    user_review_description = db.Column(db.String)
    user_id = db.Column(db.Integer)
    title_id = db.Column(db.Integer)
    insert_date = db.Column(db.DateTime)
    updated_date = db.Column(db.DateTime)

    def __init__(self, user_review_rating, user_review_title, user_review_description, user_id, title_id, insert_date):
        self.user_review_rating = user_review_rating
        self.user_review_title = user_review_title
        self.user_review_description = user_review_description
        self.user_id = user_id
        self.title_id = title_id
        self.insert_date = insert_date
    