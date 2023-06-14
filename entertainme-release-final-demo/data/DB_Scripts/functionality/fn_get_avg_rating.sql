-- FUNCTION: dbo.fn_get_avg_rating(integer)

-- DROP FUNCTION IF EXISTS dbo.fn_get_avg_rating(integer);

CREATE OR REPLACE FUNCTION dbo.fn_get_avg_rating(
	_title_id integer)
    RETURNS numeric
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    _avg_rating numeric;
BEGIN
   SELECT round(avg(ur.user_review_rating), 1) AS avg_rating
   INTO _avg_rating
   FROM dbo.user_review ur
   WHERE ur.title_id = _title_id
   GROUP BY title_id;
   
   RETURN _avg_rating;
END;
$BODY$;

ALTER FUNCTION dbo.fn_get_avg_rating(integer)
    OWNER TO postgres;