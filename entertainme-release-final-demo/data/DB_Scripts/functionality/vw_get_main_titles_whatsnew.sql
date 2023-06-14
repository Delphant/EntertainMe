/******************************
	Description: 
      View that returns the 10 of the users latest items added to the watchlist. Used to display on main screen when user logs in.
   Version:
       1.0
   Modifications:
      04/29/23 by Brandon: Created initial version.
******************************/
CREATE OR REPLACE VIEW dbo.vw_get_main_titles_whatsnew
 AS
 SELECT t.title_id,
    t.title_name,
    t.title_description,
    g.genre_name
   FROM dbo.title t
     JOIN dbo.genre g ON g.genre_id = t.genre_id
  ORDER BY t.title_date_added DESC
 LIMIT 20;

ALTER TABLE dbo.vw_get_main_titles_whatsnew
    OWNER TO postgres;

/* Use Case */
/*
   SELECT *
   FROM dbo.vw_get_main_titles_whatsnew;   
*/
