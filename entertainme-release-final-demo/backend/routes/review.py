from flask import request
from datetime import datetime
from flask_jwt_extended import jwt_required

from app import app, db
from models.review import Review
from models.user import User
from models.title import Title

def format_result(type, data):
    match type:
        case "all_title_reviews":
            return {
                "reviewer_name": User.get_user_fullname(data.user_id),
                "user_review_id": data.user_review_id,
                "user_review_rating": data.user_review_rating,
                "user_review_title": data.user_review_title,
                "user_review_description": data.user_review_description,
                "review_date": data.insert_date
            }
        case _:
            return "Unhandled return type!!"
        
#=============================================================================================================================
# Route --> /review/<title_id>
# Type: [GET]
#
#	Desc:	    Get the list of the latest 10 titles added to the watchlist  
#   Param:      N/A
#   Called by:  Frontend watchlist page
#=============================================================================================================================
@app.route('/review/<title_id>', methods = ['GET'])
@jwt_required() # prevent unauthenticated users from making requests to the API endpoint
def get_reviews(title_id):
    reviews = Review.query.filter_by(title_id=title_id).order_by(Review.insert_date.desc()).limit(5).all()
    reviews_list = []
    for review in reviews:
        reviews_list.append(format_result("all_title_reviews", review))
    return {'reviews': reviews_list}

#=============================================================================================================================
# Route --> /userwatchlist
# Type: [GET]
#
#	Desc:	    Get the list of the latest 10 titles added to the watchlist  
#   Param:      N/A
#   Called by:  Frontend watchlist page
#=============================================================================================================================
@app.route('/review', methods = ['POST'])
@jwt_required() # prevent unauthenticated users from making requests to the API endpoint
def write_review():
    user_review_rating = request.json['user_review_rating']
    user_review_title = request.json['user_review_title']
    user_review_description = request.json['user_review_description']
    user_id = request.json['user_id']
    title_id = request.json['title_id']
    insert_date = datetime.now()

    # Check if title exists in DB
    try:
        Title.query.filter_by(title_id=title_id).one()
    except:
        return f'No title was found with ID: {title_id}', 404
    
    userReview = Review(user_review_rating, user_review_title, user_review_description, user_id, title_id, insert_date)

    db.session.add(userReview)
    db.session.commit()
    return "Review created!", 201