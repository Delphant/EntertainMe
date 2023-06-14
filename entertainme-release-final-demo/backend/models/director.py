from app import db

#=============================================================================================================================
# Class --> Director
#
#	Desc:	A class utilized to represent Directors
#   Param:  N/A
#=============================================================================================================================
class Director(db.Model):
    __tablename__ = 'director'

    director_id = db.Column(db.Integer, primary_key=True)
    director_name = db.Column(db.String)
    insert_date = db.Column(db.DateTime)
    updated_date = db.Column(db.DateTime)

    def __init__(self, director_name):
        self.director_name = director_name

    def get_director_name(director_id):
        director = Director.query.filter_by(director_id=director_id).first()
        return director.director_name

#=============================================================================================================================
# Class --> DirectorTitle
#
#	Desc:	A class utilized to represent Directors for all Titles.
#   Param:  N/A
#=============================================================================================================================
class DirectorTitle(db.Model):
    __tablename__ = 'director_title'

    director_title_id = db.Column(db.Integer, primary_key=True)
    director_id = db.Column(db.Integer)
    title_id = db.Column(db.Integer)
    insert_date = db.Column(db.DateTime)
    updated_date = db.Column(db.DateTime)

    def __init__(self, director_id, title_id):
        self.director_id = director_id
        self.title_id = title_id

    def get_director_by_title_id(title_id):
        directors = DirectorTitle.query.filter_by(title_id=title_id).limit(5).all()

        directors_list = []
        for director in directors:
            directors_list.append(Director.get_director_name(director.director_id))
            
        return directors_list
