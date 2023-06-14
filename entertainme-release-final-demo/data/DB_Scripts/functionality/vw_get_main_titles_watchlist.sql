/******************************
	Description: 
      View that returns the 10 of the users latest items added to the watchlist. Used to display on main screen when user logs in.
   Version:
       1.0
******************************/
CREATE OR REPLACE VIEW dbo.vw_get_main_titles_watchlist
 AS
 SELECT t.title_id,
    t.title_name,
    t.title_description,
    g.genre_name,
    wl.user_id
   FROM dbo.user_watchlist wl
   	 JOIN dbo.title t ON t.title_id = wl.title_id
     JOIN dbo.genre g ON g.genre_id = t.genre_id
  ORDER BY wl.insert_date DESC
 LIMIT 20;

ALTER TABLE dbo.vw_get_main_titles_watchlist
    OWNER TO postgres;


/* Use Case */
/*
   SELECT *
   FROM dbo.vw_get_main_titles_watchlist
   WHERE user_id = 1;
*/