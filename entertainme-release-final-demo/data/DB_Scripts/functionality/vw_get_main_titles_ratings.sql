/******************************
	Description: 
      View that returns the 10 of the last recommended titles from a user search. Used to display on main screen when user logs in.
   Version: 
      1.0
******************************/
CREATE OR REPLACE VIEW dbo.vw_get_main_titles_ratings
 AS
 SELECT t.title_id,
    t.title_name,
    t.title_description,
    g.genre_name,
    round(avg(ur.user_review_rating), 1) AS avg_rating
   FROM dbo.user_review ur
     JOIN dbo.title t ON t.title_id = ur.title_id
     JOIN dbo.genre g ON g.genre_id = t.genre_id
  GROUP BY t.title_id, t.title_name, t.title_description, g.genre_name
  ORDER BY avg_rating DESC
  LIMIT 20;
  
ALTER TABLE dbo.vw_get_main_titles_ratings
    OWNER TO postgres;
/* Use Case */
/*
   SELECT *
   FROM dbo.vw_get_main_titles_ratings
*/