/******************************
	Description: 
      View that returns the 10 of the last recommended titles from a user search. Used to display on main screen when user logs in.
   Version: 
      2.0
******************************/
CREATE OR REPLACE VIEW dbo.vw_get_main_titles_lastrecs
 AS
 -- Gets the latest search ID for every user (filtered by the caller).
 WITH lastest_search_id AS (
         SELECT user_search.user_id,
            max(user_search.user_search_id) AS max_search_id
           FROM dbo.user_search
          GROUP BY user_search.user_id
        )
 -- Returns a result set of the recommendations based on the search ID populated in lastest_search_id.
 SELECT t.title_id,
    t.title_name,
    t.title_description,
    g.genre_name,
    ls.user_id
FROM dbo.search_result sr
	INNER JOIN lastest_search_id ls ON ls.max_search_id = sr.user_search_id
	INNER JOIN dbo.title t ON t.title_id = sr.title_id
	INNER JOIN dbo.genre g ON g.genre_id = t.genre_id
ORDER BY sr.user_search_id, t.title_name;

ALTER TABLE dbo.vw_get_main_titles_lastrecs
    OWNER TO postgres;

/* Use Case */
/*
   SELECT *
   FROM dbo.vw_get_main_titles_lastrecs
   WHERE user_id = 1;
*/