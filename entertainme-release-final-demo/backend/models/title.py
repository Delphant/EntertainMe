from app import db

#=============================================================================================================================
# Class --> Title
#
#	Desc:	A class utilized to store user search results
#   Param:  title_name - (int) The name of the title
#           title_description - (str) The description of the title
#=============================================================================================================================
class Title(db.Model):
    __tablename__ = 'title'

    title_id = db.Column(db.Integer, primary_key=True)
    title_name = db.Column(db.String)
    title_description = db.Column(db.String)
    title_date_added = db.Column(db.DateTime)
    title_release_year = db.Column(db.Integer)
    title_duration = db.Column(db.String)
    genre_id = db.Column(db.Integer)
    updated_date = db.Column(db.DateTime)

    def __init__(self, title_name, title_description):
        self.title_name = title_name
        self.title_description = title_description

    #=============================================================================================================================
    # Function --> get_title_name
    #
    #	Desc:	    A function obtain title name using title id
    #   Param:      title_id - (int) The id of the title
    #   Called by:  watchlist route
    #=============================================================================================================================
    def get_title_name(title_id):
        title = Title.query.filter_by(title_id=title_id).first()
        return title.title_name

    #=============================================================================================================================
    # Function --> get_genre_id
    #
    #	Desc:	    A function obtain the genre id of a title
    #   Param:      title_id - (int) The id of the title
    #   Called by:  routes: search, home, watchlist
    #=============================================================================================================================
    def get_genre_id(title_id):
        title = Title.query.filter_by(title_id=title_id).first()
        return title.genre_id
    
    def get_avg_rating(title_id):
        #call get recs proc: inserts into user_search table --> generates list of recs --> writes recs to search_results table
        print(title_id)
        conn = None
        try:
            conn = db.engine.raw_connection()
            cur = conn.cursor()

            cur.callproc('dbo.fn_get_avg_rating', (title_id,))
            avg_rating = cur.fetchone()[0]
            
            #commit changes
            conn.commit()
            #close the communication with the PostgreSQL database server
            cur.close()
        except:
            print("An exception occurred when trying to get the average rating")
        finally:
            if conn is not None:
                conn.close()

        return avg_rating

#=============================================================================================================================
# Class --> Toprating
#
#	Desc:	A class utilized to access DB View: vw_get_main_titles_ratings.
#           The view gets the average rating of 10 different titles.
#   Param:  title_id - (int) The id of the title
#           title_name - (int) The name of the title
#           title_description - (str) The description of the title
#           genre_name - (str) The genre name
#           avg_rating - (float) The average rating of the title
#=============================================================================================================================
class Toprating(db.Model):
    #treat view as table
    __tablename__ = 'vw_get_main_titles_ratings'

    title_id = db.Column(db.Integer, primary_key=True)
    title_name = db.Column(db.String)
    genre_name = db.Column(db.String)
    avg_rating = db.Column(db.Float)

    def __init__(self, title_id, title_name, genre_name, avg_rating):
        self.title_id = title_id
        self.title_name = title_name
        self.genre_name = genre_name
        self.avg_rating = avg_rating