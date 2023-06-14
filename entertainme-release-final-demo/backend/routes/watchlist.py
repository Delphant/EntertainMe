from flask import request
from datetime import datetime
from flask_jwt_extended import jwt_required

from app import app, db
from models.title import Title
from models.watchlist import Watchlist
from models.genre import Genre


def format_result(type, data):
    match type:
        case "all_watchlist_titles":
            #get the genre_id
            genre_id = Title.get_genre_id(data.title_id)

            return {
                "user_watchlist_id": data.user_watchlist_id,
                "user_watchlist_favorite": data.user_watchlist_favorite,
                "user_id": data.user_id,
                "title_id": data.title_id,
                "title_name": Title.get_title_name(data.title_id),
                "genre_name": Genre.get_genre_name(genre_id)
            }
        case _:
            return "Unhandled return type!!"
        
#=============================================================================================================================
# Route --> /userwatchlist
# Type: [GET]
#
#	Desc:	    Get the list of the latest 10 titles added to the watchlist  
#   Param:      N/A
#   Called by:  Frontend watchlist page
#=============================================================================================================================
@app.route('/userwatchlist', methods = ['GET'])
@jwt_required() # prevent unauthenticated users from making requests to the API endpoint
def get_watchlist():
    user_id = request.headers['userid']
    watchlist = Watchlist.query.filter_by(user_id=user_id).order_by(Watchlist.insert_date.desc()).all()
    watchlist_list = []
    for title in watchlist:
        watchlist_list.append(format_result("all_watchlist_titles", title))
    return {'titles': watchlist_list}, 200

#=============================================================================================================================
# Route --> /userwatchlist/<user_watchlist_id> 
# # Type: [DELETE]
#
#	Desc:	    Deletes a title from watchlist
#   Param:      user_watchlist_id - the unique watchlist id of the title to be deleted
#   Called by:  Frontend watchlist page
#=============================================================================================================================
@app.route('/userwatchlist/<title_id>', methods = ['DELETE'])
@jwt_required() # prevent unauthenticated users from making requests to the API endpoint
def delete_userwatchlist_title(title_id):
    user_id = request.headers['userid']

    # Check if title is on watchlist
    is_watchlist = Watchlist.query.filter_by(user_id=user_id, title_id=title_id).first()
    if is_watchlist == None:
            return "Title not found in watchlist!", 404
    
    title = Watchlist.query.filter_by(title_id=title_id, user_id=user_id).first()
    db.session.delete(title)
    db.session.commit()
    return 'Title deleted from watchlist!', 201

#=============================================================================================================================
# Route --> /userwatchlist
# Type: [POST]
#
#	Desc:	    Adds a title to watchlist
#   Param:      N/A
#   Called by:  Frontend watchlist page
#=============================================================================================================================
@app.route('/userwatchlist', methods = ['POST'])
def add_watchlist():
    user_id = request.json['user_id']
    title_id = request.json['title_id']

    # Check if title exists in DB
    try:
        Title.query.filter_by(title_id=title_id).one()
    except:
        return f'No title was found with ID: {title_id}', 404
    
    # Check if title already on watchlist
    is_watchlist = Watchlist.query.filter_by(user_id=user_id, title_id=title_id).first()
    if is_watchlist != None:
            return "Title already in watchlist!", 409
    
    user_watchlist_favorite = request.json['user_watchlist_favorite']
    insert_date = datetime.now()
    watchlistTitle = Watchlist(user_watchlist_favorite, user_id, title_id, insert_date)
    
    db.session.add(watchlistTitle)
    db.session.commit()
    return "Title added to watchlist!", 201