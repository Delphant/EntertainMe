/******************************
	Desctription:
		Function to return a list of recommendations based on the following metrics:
		Actors 25% - 5% per actor in input title, up to 5 actors for 25% total weight.
		Director 15% 
		Review 12.5% - take # of stars / 5 (to get pct). (NOT IMPLEMENTED YET)
		Promoted 12.5% - Based on sliding scale of promotion. (NOT IMPLEMENTED YET)
		Genre 35% 
	Returns:
		Top 10 results based on total score out of 100.
	Version: 
		3.0
    TODO:
        - Remove the input title as a possible output
		- Remove items from users watch list
		
******************************/
CREATE OR REPLACE FUNCTION dbo.fn_get_recommendations_by_title(
	integer,
	integer)
    RETURNS SETOF integer 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
	
	RETURN QUERY
		WITH match_calculation AS (
			SELECT 	
				 t.title_id
				--,t.title_name
				,t.title_date_added
				,CASE
					--WHEN actor.match_cnt >= 5 THEN .25
					--WHEN actor.match_cnt < 5 THEN actor.match_cnt * .05
					WHEN actor.match_cnt > 0 THEN .3
					ELSE 0
				 END AS actor_pct
				,CASE 
					WHEN director.match_cnt > 0 THEN .3 
					ELSE 0 
				END AS director_pct
				,CASE 
					WHEN genre.title_id IS NOT NULL THEN .15 
					ELSE 0
				 END AS genre_pct
				,rating.avg_rating * .05 AS rating_pct
			FROM dbo.title t
				-- Gets the count of actors in the searched title with every other title
				LEFT JOIN (
					SELECT 
						 at.title_id
						,COUNT(1) AS match_cnt
					--SELECT *
					FROM dbo.actor_title at 
					INNER JOIN dbo.actor_title input ON input.title_id = $1 AND input.actor_id = at.actor_id
					GROUP BY at.title_id
				)actor ON actor.title_id = t.title_id
				-- Gets the count of directors in the searched title with every other title
				LEFT JOIN (
					SELECT 
						 dt.title_id
						,COUNT(1) AS match_cnt
					--SELECT *
					FROM dbo.director_title dt 
					INNER JOIN dbo.director_title input ON input.title_id = $1 AND input.director_id = dt.director_id
					GROUP BY dt.title_id
				)director ON director.title_id = t.title_id
				LEFT JOIN dbo.title genre ON genre.title_id = $1 AND genre.genre_id = t.genre_id
				LEFT JOIN (
					SELECT 
						title_id,
						round(avg(ur.user_review_rating)) * 1.0 AS avg_rating
				    FROM dbo.user_review ur
				    GROUP BY title_id
				)rating ON rating.title_id = t.title_id
		)
				
		SELECT mc.title_id
		FROM match_calculation mc
		LEFT JOIN dbo.user_watchlist uw ON uw.user_id = $2 AND uw.title_id = mc.title_id
		WHERE mc.title_id <> $1 AND uw.title_id IS NULL
		ORDER BY actor_pct + director_pct + genre_pct + rating_pct DESC,title_date_added DESC
		LIMIT 20;
				
	RETURN;
END; 
$BODY$;

ALTER FUNCTION dbo.fn_get_recommendations_by_title(integer, integer)
    OWNER TO postgres;


/* Example Use */
/*
	SELECT *
	FROM dbo.title t
	WHERE t.title_id in (
				SELECT * 
				FROM dbo.fn_get_recommendations_by_title(36137,1)
			)
*/

