from app import db

#=============================================================================================================================
# Class --> Genre
#
#	Desc:	A class utilized to represent a movie genre
#   Param:  genre_name - (str) The genre name
#=============================================================================================================================
class Genre(db.Model):
    __tablename__ = 'genre'

    genre_id = db.Column(db.Integer, primary_key=True)
    genre_name = db.Column(db.String)
    insert_date = db.Column(db.DateTime)
    updated_date = db.Column(db.DateTime)

    def __init__(self, genre_name):
        self.genre_name = genre_name

    #=============================================================================================================================
    # Function --> get_genre_name
    #
    #	Desc:	    A function obtain genre name using genre id
    #   Param:      genre_id - (int) The genre id
    #   Called by:  home, title routes
    #=============================================================================================================================
    def get_genre_name(genre_id):  
        genre = Genre.query.filter_by(genre_id=genre_id).one()
        return genre.genre_name
