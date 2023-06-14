from flask import request
from flask_jwt_extended import jwt_required

from app import app, db
from models.search_result import Search
from models.title import Title
from models.genre import Genre

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
        case "recs":
            #get the genre_id
            genre_id = Title.get_genre_id(data.title_id)

            return {
                "title_id": data.title_id,
                "title_name": Title.get_title_name(data.title_id),
                "genre_name": Genre.get_genre_name(genre_id)
            }
        case _:
            return "Unhandled return type!!"

#=============================================================================================================================
# Route --> /generaterecs
# Type: [POST]
#
#	Desc:	    Adds selected title to search history
#   Param:      N/A
#   Called by:  Frontend search page
#=============================================================================================================================
@app.route('/getrecs/<title_id>', methods = ['GET'])
@jwt_required() # prevent unauthenticated users from making requests to the API endpoint
def save_search_result(title_id):
    user_id = request.headers['userid']

    #call get recs proc: inserts into user_search table --> generates list of recs --> writes recs to search_results table
    conn = None
    try:
        conn = db.engine.raw_connection()
        cur = conn.cursor()
        cur.callproc('dbo.fn_insert_user_recs', (title_id, user_id))
        user_search_id = cur.fetchone()[0]

        #commit changes
        conn.commit()
        #close the communication with the PostgreSQL database server
        cur.close()
    except:
        print("An exception occurred")
    finally:
        if conn is not None:
            conn.close()

    #Get the list of recommendations
    try:
        searchHistory = Search.query.filter_by(user_search_id=user_search_id).all()
    except:
        return f'Unable to find recommendations for title ID: {title_id}', 404
    
    recs_list = []
    for title in searchHistory:
        recs_list.append(format_result("recs", title))

    return {'recs': recs_list}, 200
    