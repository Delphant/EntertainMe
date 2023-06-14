from flask import request
from flask_jwt_extended import jwt_required

from app import app
from models.title import Title, Toprating
from models.watchlist import Watchlist
from models.genre import Genre
from models.recommendations import Latestrecs

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
        case "whatsnew":
            return {
                "title_id": data.title_id,
                "title_name": data.title_name,
                "title_release_year": data.title_release_year,
                "genre_name": Genre.get_genre_name(data.genre_id)
            }
        case "watchlist":
            #get the genre_id
            genre_id = Title.get_genre_id(data.title_id)

            return {
                "title_id": data.title_id,
                "title_name": Title.get_title_name(data.title_id),
                "genre_name": Genre.get_genre_name(genre_id)
            }
        case "latestrecs":
            return {
                "title_id": data.title_id,
                "title_name": data.title_name,
                "genre_name": data.genre_name
            }
        case "toprating":
            return {
                "title_id": data.title_id,
                "title_name": data.title_name,
                "genre_name": data.genre_name
            }
        case _:
            return "Unhandled return type!!"


#=============================================================================================================================
# Route --> /titles
#
#	Desc:	    Gets a list of 10 for the following: latest titles added to db, latest titles added to watchlist,
#               latest recommendations provided, top rated titles in db.
#   Param:      N/A
#   Called by:  Frontend home page
#=============================================================================================================================
# get all titles
@app.route('/titles', methods = ['GET'])
@jwt_required() # prevent unauthenticated users from making requests to the API endpoint
def get_titles():
    user_id = request.headers['userid']

    #get 10 latest titles added to the db
    whatsnew = Title.query.order_by(Title.title_date_added.desc()).limit(20).all()
    whatsnew_list = []
    for title in whatsnew:
        whatsnew_list.append(format_result("whatsnew", title))

    #get 20 latest titles added to watchlist
    watchlist = Watchlist.query.filter_by(user_id=user_id).order_by(Watchlist.insert_date.desc()).limit(20).all()
    watchlist_list = []
    for title in watchlist:
        watchlist_list.append(format_result("watchlist", title))

    #get 10 latest recommendations
    latestrecs = Latestrecs.query.filter_by(user_id=user_id).all()
    latestrecs_list = []
    for title in latestrecs:
        latestrecs_list.append(format_result("latestrecs", title))

    #get 10 top rated titles
    top_rating_titles = Toprating.query.all()
    top_rating = []
    for title in top_rating_titles:
        top_rating.append(format_result("toprating", title))

    #return full JSON data with all lists
    return {'whatsnew': whatsnew_list, 'watchlist': watchlist_list, 'latestrecs': latestrecs_list, 'top_rating': top_rating}, 200
    