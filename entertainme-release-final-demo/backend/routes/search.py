from flask_jwt_extended import jwt_required

from app import app
from models.title import Title
from models.genre import Genre

def format_result(type, data):
    match type:
        case "search_results":
            #get the genre_id
            genre_id = Title.get_genre_id(data.title_id)

            return {
                "title_id": data.title_id,
                "title_name": data.title_name,
                "title_description": data.title_description,
                "genre_name": Genre.get_genre_name(genre_id)
            }
        case _:
            return "Unhandled return type!!"


            
#=============================================================================================================================
# Route --> /search/<search_str>
# Type: [GET]
#
#	Desc:	    Gets a list of all titles containing the specified string
#   Param:      search_str - the string to be searched
#   Called by:  Frontend search page
#=============================================================================================================================
@app.route('/search/<search_str>', methods = ['GET'])
@jwt_required() # prevent unauthenticated users from making requests to the API endpoint
def get_results(search_str):
    search_str = '%{0}%'.format(search_str)
    search_results = Title.query.filter(Title.title_name.ilike(search_str)).order_by(Title.title_name.asc()).limit(50).all()
    results_list = []
    for title in search_results:
        results_list.append(format_result("search_results", title))
    return {'titles': results_list}, 200
