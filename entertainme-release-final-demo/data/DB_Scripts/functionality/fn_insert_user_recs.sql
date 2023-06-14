-- FUNCTION: dbo.fn_insert_user_recs(integer, integer)

-- DROP FUNCTION IF EXISTS dbo.fn_insert_user_recs(integer, integer);

CREATE OR REPLACE FUNCTION dbo.fn_insert_user_recs(
	_title_id integer,
	_user_id integer)
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    _user_search_id INTEGER;
BEGIN
    -- Insert the title searched by the user to the user_search table.
	INSERT INTO dbo.user_search(
		user_id,
		title_id,
		insert_date,
		updated_date
	)
	VALUES(_user_id, _title_id, current_timestamp, current_timestamp);
	
	-- Set the out parameter to the latest search id for the user.
	SELECT MAX(user_search_id)
	INTO _user_search_id
	FROM dbo.user_search
	WHERE user_id = _user_id AND title_id = _title_id;
	
	-- Insert the result set of the get recommendations function to the search_result table.
	INSERT INTO dbo.search_result(
		user_search_id,
		title_id,
		insert_date,
		updated_date
	)
	SELECT 
		_user_search_id,
		*,
		current_timestamp, 
		current_timestamp
	FROM dbo.fn_get_recommendations_by_title(_title_id, _user_id);
	
	-- Returns the ID to the backend.
	RETURN _user_search_id;
END;
$BODY$;

ALTER FUNCTION dbo.fn_insert_user_recs(integer, integer)
    OWNER TO postgres;
