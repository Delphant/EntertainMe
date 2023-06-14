from app import db

#=============================================================================================================================
# Class --> Watchlist
#
#	Desc:	A class utilized to handle user watchlist
#   Param:  user_watchlist_favorite - (bool) Determines if title is marked as fav
#           user_id - (int) The id of the user's watchlist
#           title_id - (int) The id of the title
#           insert_date - (datetime) The date and time of the title entry to watchlist
#=============================================================================================================================
class Watchlist(db.Model):
    __tablename__ = 'user_watchlist'

    user_watchlist_id = db.Column(db.Integer, primary_key=True)
    user_watchlist_favorite = db.Column(db.Boolean)
    user_id = db.Column(db.Integer)
    title_id = db.Column(db.Integer)
    insert_date = db.Column(db.DateTime)
    updated_date = db.Column(db.DateTime)

    def __init__(self, user_watchlist_favorite, user_id, title_id, insert_date):
        self.user_watchlist_favorite = user_watchlist_favorite
        self.user_id = user_id
        self.title_id = title_id
        self.insert_date = insert_date
    
    #=============================================================================================================================
    # Function --> is_user_watchlist
    #
    #	Desc:	    A function to check if title belongs to user watchlist
    #   Param:      user_id - (int) The id of the user's watchlist
    #               title_id - (int) The id of the title
    #   Called by:  title by ID route
    #=============================================================================================================================
    def is_user_watchlist(user_id, title_id):
        #get the userwatchlist ID for the title_id that matches the current user
        user_watchlist_id = Watchlist.query.filter_by(title_id=title_id, user_id=user_id).first()

        if user_watchlist_id != None:
            return True
        else:
            return False
        
    #=============================================================================================================================
    # Function --> is_user_watchlist_favorite
    #
    #	Desc:	    A function obtain title name using title id
    #   Param:      user_id - (int) The id of the user's watchlist
    #               title_id - (int) The id of the title
    #   Called by:  title by ID route
    #=============================================================================================================================
    def is_user_watchlist_favorite(user_id, title_id):
        #get the userwatchlist ID for the title_id that matches the current user
        user_watchlist_id = Watchlist.query.filter_by(title_id=title_id, user_id=user_id).first()

        if user_watchlist_id != None:
            if user_watchlist_id.user_watchlist_favorite:
                return True
            else:
                return False
        else:
            return False    
        
