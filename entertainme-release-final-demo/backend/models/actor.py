from app import db

#=============================================================================================================================
# Class --> Actor
#
#	Desc:	A class utilized to represent Actors
#   Param:  actor_name - (str) The name of the actor
#=============================================================================================================================
class Actor(db.Model):
    __tablename__ = 'actor'

    actor_id = db.Column(db.Integer, primary_key=True)
    actor_name = db.Column(db.String)
    insert_date = db.Column(db.DateTime)
    updated_date = db.Column(db.DateTime)

    def __init__(self, actor_name):
        self.actor_name = actor_name

    def get_actor_name(actor_id):
        actor = Actor.query.filter_by(actor_id=actor_id).one()
        return actor.actor_name

class ActorTitle(db.Model):
    __tablename__ = 'actor_title'

    actor_title_id = db.Column(db.Integer, primary_key=True)
    actor_id = db.Column(db.Integer)
    title_id = db.Column(db.Integer)
    insert_date = db.Column(db.DateTime)
    updated_date = db.Column(db.DateTime)

    def __init__(self, actor_id, title_id):
        self.actor_id = actor_id
        self.title_id = title_id

    def get_actor_by_title_id(title_id):
        actors = ActorTitle.query.filter_by(title_id=title_id).limit(5).all()

        actors_list = []
        for actor in actors:
            actors_list.append(Actor.get_actor_name(actor.actor_id))
            
        return actors_list