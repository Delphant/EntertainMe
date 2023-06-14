SET search_path TO  EntertainMe; -- Set DB to create tables on

/* Create dbo schema */
CREATE SCHEMA IF NOT EXISTS dbo
    AUTHORIZATION postgres;
	
/* Create the Tables */
-- Foreign key tables need to exist first

CREATE TABLE dbo.user
(
	 user_id	            int PRIMARY KEY GENERATED ALWAYS AS IDENTITY
	,user_first_name	text
	,user_last_name	    text
	,user_email_address	text
	,user_password	    text
	,user_birth_date	timestamp
	,user_date_joined	timestamp
	,user_type	        text
	,insert_date	    timestamp
	,updated_date	    timestamp
);

CREATE TABLE dbo.actor
(
	 actor_id	    int PRIMARY KEY GENERATED ALWAYS AS IDENTITY
	,actor_name	    text
	,insert_date	timestamp
	,updated_date	timestamp
);

CREATE TABLE dbo.director
(
	 director_id	int PRIMARY KEY GENERATED ALWAYS AS IDENTITY
	,director_name	text
	,insert_date	timestamp
	,updated_date	timestamp
);

CREATE TABLE dbo.genre
(
	 genre_id	    int PRIMARY KEY GENERATED ALWAYS AS IDENTITY
	,genre_name	    text
	,insert_date	timestamp
	,updated_date	timestamp
);

CREATE TABLE dbo.category
(
	 category_id	int PRIMARY KEY GENERATED ALWAYS AS IDENTITY
	,category_name	text
	,insert_date	timestamp
	,updated_date	timestamp
);

CREATE TABLE dbo.title
(
	 title_id				int PRIMARY KEY GENERATED ALWAYS AS IDENTITY
	,title_name				text NOT NULL
	,title_description		text
	,title_date_added		timestamp
	,title_release_year		int
	,title_duration			int
    ,genre_id               int
	,category_id			int
	,insert_date			timestamp
	,updated_date			timestamp
    ,CONSTRAINT fk_category
        FOREIGN KEY(category_id)
            REFERENCES dbo.category(category_id)
    ,CONSTRAINT fk_genre
        FOREIGN KEY(genre_id)
            REFERENCES dbo.genre(genre_id)
);

-- Transaction tables
CREATE TABLE dbo.user_review
(
	 user_review_id				int PRIMARY KEY GENERATED ALWAYS AS IDENTITY
	,user_review_rating 		decimal
	,user_review_date 			timestamp
	,user_review_description 	text
	,user_id  					int
	,title_id 					int 
	,insert_date				timestamp
	,updated_date				timestamp
    ,CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES dbo.user(user_id)
    ,CONSTRAINT fk_title
        FOREIGN KEY(title_id)
            REFERENCES dbo.title(title_id)
);

CREATE TABLE dbo.user_watchlist
(
	 user_watchlist_id			int PRIMARY KEY GENERATED ALWAYS AS IDENTITY
	,user_watchlist_add_date 	timestamp
	,user_watchlist_favorite 	boolean
	,user_id  					int
	,title_id 					int 
	,insert_date				timestamp
	,updated_date				timestamp
,CONSTRAINT fk_user
	FOREIGN KEY(user_id)
		REFERENCES dbo.user(user_id)
,CONSTRAINT fk_title
	FOREIGN KEY(title_id)
		REFERENCES dbo.title(title_id)
);

CREATE TABLE dbo.actor_title
(
	 actor_title_id			    int PRIMARY KEY GENERATED ALWAYS AS IDENTITY
	,actor_id  					int
	,title_id 					int 
	,insert_date				timestamp
	,updated_date				timestamp
,CONSTRAINT fk_actor
	FOREIGN KEY(actor_id)
		REFERENCES dbo.actor(actor_id)
,CONSTRAINT fk_title
	FOREIGN KEY(title_id)
		REFERENCES dbo.title(title_id)
);

CREATE TABLE dbo.director_title
(
	 director_title_id			int PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    ,director_id  				int
	,title_id 					int 
	,insert_date				timestamp
	,updated_date				timestamp
,CONSTRAINT fk_director
	FOREIGN KEY(director_id)
		REFERENCES dbo.director(director_id)
,CONSTRAINT fk_title
	FOREIGN KEY(title_id)
		REFERENCES dbo.title(title_id)
);

CREATE TABLE dbo.user_search
(
	 user_search_id			    int PRIMARY KEY GENERATED ALWAYS AS IDENTITY
	,user_id  					int
	,title_id 					int 
	,insert_date				timestamp
	,updated_date				timestamp
,CONSTRAINT fk_user
	FOREIGN KEY(user_id)
		REFERENCES dbo.user(user_id)
,CONSTRAINT fk_title
	FOREIGN KEY(title_id)
		REFERENCES dbo.title(title_id)
);

CREATE TABLE dbo.search_result
(
	 search_result_id			int PRIMARY KEY GENERATED ALWAYS AS IDENTITY
	,user_id  					int
	,title_id 					int 
	,insert_date				timestamp
	,updated_date				timestamp
,CONSTRAINT fk_user
	FOREIGN KEY(user_id)
		REFERENCES dbo.user(user_id)
,CONSTRAINT fk_title
	FOREIGN KEY(title_id)
		REFERENCES dbo.title(title_id)
);

CREATE TABLE dbo.promoted_title
(
	 promoted_title_id			int PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    ,promoted_title_end_date	timestamp
    ,promoted_title_start_date	timestamp
    ,promoted_title_pct	        decimal
	,user_id  					int
	,title_id 					int 
	,insert_date				timestamp
	,updated_date				timestamp
,CONSTRAINT fk_user
	FOREIGN KEY(user_id)
		REFERENCES dbo.user(user_id)
,CONSTRAINT fk_title
	FOREIGN KEY(title_id)
		REFERENCES dbo.title(title_id)
);