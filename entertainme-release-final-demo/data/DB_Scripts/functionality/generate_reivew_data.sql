WITH review AS (
	SELECT 
		'Lorem ipsum dolor sit amet'	AS review_title
		,'ulla venenatis, nisl in placerat cursus, augue massa porta nunc, id elementum ex libero a nibh. Maecenas in ultricies est. Aliquam vel venenatis lacus. 
		 Fusce in nisl sagittis, vehicula ex ut, dictum mauris. Maecenas ex eros, dignissim sit amet purus eget, dignissim lobortis sapien. Sed placerat sem non elit ultricies sodales et at velit' AS review_desc
	UNION ALL
	SELECT 
		'Lorem ipsum dolor sit amet'	AS review_title
		,'ulla venenatis, nisl in placerat cursus, augue massa porta nunc, id elementum ex libero a nibh. Maecenas in ultricies est. Aliquam vel venenatis lacus. 
		 Fusce in nisl sagittis, vehicula ex ut, dictum mauris. Maecenas ex eros, dignissim sit amet purus eget, dignissim lobortis sapien. Sed placerat sem non elit ultricies sodales et at velit' AS review_desc
	UNION ALL
	SELECT 
		'Lorem ipsum dolor sit amet'	AS review_title
		,'ulla venenatis, nisl in placerat cursus, augue massa porta nunc, id elementum ex libero a nibh. Maecenas in ultricies est. Aliquam vel venenatis lacus. 
		 Fusce in nisl sagittis, vehicula ex ut, dictum mauris. Maecenas ex eros, dignissim sit amet purus eget, dignissim lobortis sapien. Sed placerat sem non elit ultricies sodales et at velit' AS review_desc
	UNION ALL
	SELECT 
		'Lorem ipsum dolor sit amet'	AS review_title
		,'ulla venenatis, nisl in placerat cursus, augue massa porta nunc, id elementum ex libero a nibh. Maecenas in ultricies est. Aliquam vel venenatis lacus. 
		 Fusce in nisl sagittis, vehicula ex ut, dictum mauris. Maecenas ex eros, dignissim sit amet purus eget, dignissim lobortis sapien. Sed placerat sem non elit ultricies sodales et at velit' AS review_desc
	UNION ALL
	SELECT 
		'Lorem ipsum dolor sit amet'	AS review_title
		,'ulla venenatis, nisl in placerat cursus, augue massa porta nunc, id elementum ex libero a nibh. Maecenas in ultricies est. Aliquam vel venenatis lacus. 
		 Fusce in nisl sagittis, vehicula ex ut, dictum mauris. Maecenas ex eros, dignissim sit amet purus eget, dignissim lobortis sapien. Sed placerat sem non elit ultricies sodales et at velit' AS review_desc
)
INSERT INTO dbo.user_review ( user_review_rating, user_review_description, user_id, title_id, insert_date, updated_date, user_review_title)
SELECT 
	 floor(random() * 5 + 1)::integer AS user_review_rating
	,r.review_desc AS user_review_description
	,1 AS user_id
	,t.title_id
	,CURRENT_TIMESTAMP AS insert_date
	,CURRENT_TIMESTAMP AS updated_date
	,r.review_title AS user_review_title
FROM dbo.title t
LEFT JOIN review r ON 1=1
