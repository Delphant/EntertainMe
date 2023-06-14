from flask import request
from  sqlalchemy.sql.expression import func
from flask_jwt_extended import jwt_required

from app import app
from models.title import Title
from models.genre import Genre
from models.watchlist import Watchlist
from models.actor import ActorTitle
from models.director import DirectorTitle


def format_result(user_id, type, data):
    match type:
        case "title_by_id":
            return {
                "title_id": data.title_id,
                "title_name": data.title_name,
                "title_description": data.title_description,
                "title_release_year": data.title_release_year,
                "genre_name": Genre.get_genre_name(data.genre_id),
                "user_watchlist": Watchlist.is_user_watchlist(user_id, data.title_id),
                "user_watchlist_favorite": Watchlist.is_user_watchlist_favorite(user_id, data.title_id),
                "actor_names": ActorTitle.get_actor_by_title_id(data.title_id),
                "director_names": DirectorTitle.get_director_by_title_id(data.title_id),
                "avg_rating": Title.get_avg_rating(data.title_id)
            }
        case _:
            return "Unhandled return type!!"


#=============================================================================================================================
# Route --> /titles/<title_id>
# Type: [GET]
#
#	Desc:	    Gets title information based on title_id
#   Param:      title_id - (int) The id of the title
#   Called by:  Frontend title page
#=============================================================================================================================
@app.route('/titles/<title_id>', methods = ['GET'])
@jwt_required() # prevent unauthenticated users from making requests to the API endpoint
def get_title(title_id):
    user_id = request.headers['userid']
    try:
        title = Title.query.filter_by(title_id=title_id).one()
    except:
        return f'No title was found with ID: {title_id}', 404
    
    formatted_title = format_result(user_id, "title_by_id", title)
    return {'title': formatted_title}, 200 
    

#=============================================================================================================================
# Route --> /titles/random
# Type: [GET]
#
#	Desc:	    Selects a random title ID and returns it to the frontend
#   Param:      N/A
#   Called by:  Frontend title page
#=============================================================================================================================
@app.route('/randomtitle', methods = ['GET'])
@jwt_required() # prevent unauthenticated users from making requests to the API endpoint
def get_random_title():
    #select a random title from the title table
    title = Title.query.order_by(func.random()).first()
    return {'title_id': title.title_id}
