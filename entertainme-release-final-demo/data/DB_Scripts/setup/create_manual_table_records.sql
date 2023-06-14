-- Manually create a user record
INSERT INTO dbo.user (user_first_name, user_last_name, user_email_address, user_password, user_birth_date, user_date_joined, user_type, insert_date, updated_date)
VALUES(
	'Test'
	,'Test'
	,'test@test.com'
	,'password'
	,TO_TIMESTAMP('2023-04-29','YYYY-MM-DD HH:MI:SS')
	,TO_TIMESTAMP('2023-04-29','YYYY-MM-DD HH:MI:SS')
	,'U'
	,TO_TIMESTAMP('2023-04-29','YYYY-MM-DD HH:MI:SS')
	,TO_TIMESTAMP('2023-04-29','YYYY-MM-DD HH:MI:SS')
);
-- Test
SELECT * FROM dbo.user;


-- Manually create a user search record
INSERT INTO dbo.user_search (user_id, title_id,insert_date,updated_date)
VALUES(
	 1
	,36137
	,TO_TIMESTAMP('2023-04-29','YYYY-MM-DD HH:MI:SS')
	,TO_TIMESTAMP('2023-04-29','YYYY-MM-DD HH:MI:SS')
);
	-- Test
	SELECT * FROM dbo.user_search;


-- Manually create a recommendation search based on the user_search above.
INSERT INTO dbo.search_result (title_id, user_search_id, insert_date, updated_date)
SELECT * 
	,12
	,TO_TIMESTAMP('2023-04-29','YYYY-MM-DD HH:MI:SS')
	,TO_TIMESTAMP('2023-04-29','YYYY-MM-DD HH:MI:SS')
FROM dbo.get_recommendations_by_title(36137);

	-- Test
	SELECT * FROM dbo.search_result;


-- Manually create a watchlist records
INSERT INTO dbo.user_watchlist (user_watchlist_favorite, user_id, title_id, insert_date, updated_date)
SELECT 
	 false
	,1
	,* 
	,TO_TIMESTAMP('2023-04-29','YYYY-MM-DD HH:MI:SS')
	,TO_TIMESTAMP('2023-04-29','YYYY-MM-DD HH:MI:SS')
FROM dbo.get_recommendations_by_title(36137);

	-- Test
	SELECT * FROM dbo.user_watchlist;