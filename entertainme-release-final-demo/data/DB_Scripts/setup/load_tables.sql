/**************** Data corrections ****************/

COPY raw_data FROM '/Users/brandoncassidy/Downloads/Datasets/netflix_titles.csv' DELIMITER ',' CSV null as '' HEADER;
COPY raw_data FROM '/Users/brandoncassidy/Downloads/Datasets/hulu_titles.csv' DELIMITER ',' CSV null as '' HEADER;
COPY raw_data FROM '/Users/brandoncassidy/Downloads/Datasets/disney_plus_titles.csv' DELIMITER ',' CSV null as '' HEADER;
COPY raw_data FROM '/Users/brandoncassidy/Downloads/Datasets/amazon_prime_titles.csv' DELIMITER ',' CSV null as '' HEADER;


/**************** Data corrections for raw table ****************/


update dbo.raw_data 
set duration  = rating 
,rating = null 
where rating like '%min%'
or rating like '%Season%';

--cleans up bad actor names
delete from actor a 
where actor_id = 47291
or length(actor_name) = 1

/**************** table loads ****************/

-- LOAD DBO.CATEGORY
insert into dbo.category (category_name, insert_date, updated_date)
	select distinct rating
	,current_timestamp 
	,current_timestamp 
	from dbo.raw_data 
	order by rating


-- LOAD DBO.GENRE
insert into dbo.genre (genre_name , insert_date, updated_date)
	select distinct genre
	,current_timestamp 
	,current_timestamp 
	from (
		select 
			case 
				when listed_in like '%,%'
				then split_part(listed_in,',', 1)
				else listed_in
			end as genre
		from dbo.raw_data 
	)a
	order by genre
		

-- LOAD DBO.TITLE
insert into dbo.title 
(
	 title_name
	,title_description
	,title_date_added
	,title_release_year
	,title_duration
	,genre_id
	,category_id
	,insert_date
	,updated_date
)
	select
		rd.title 
		,rd.description 
		,cast(rd.date_added as timestamp)
		,cast(rd.release_year as integer)
		,rd.duration 
		,g.genre_id 
		,c.category_id 
		,current_timestamp 
		,current_timestamp 
	-- select *	
	-- select count(1) -- 22992
	from dbo.raw_data rd  
	left join dbo.genre g on g.genre_name  = rd.genre
	left join dbo.category c on c.category_name  = rd.rating 	
	

-- LOAD DBO.ACTOR
insert into dbo.actor (actor_name, insert_date, updated_date)
select distinct
	trim(unnest(string_to_array("cast" , ','))) as actor_name
	,current_timestamp 
	,current_timestamp 
from raw_data rd 




-- LOAD DBO.DIRECTOR
insert into dbo.director (director_name, insert_date, updated_date)
select distinct
	trim(unnest(string_to_array("cast" , ','))) as director_name
	,current_timestamp 
	,current_timestamp 
from raw_data rd 



-- LOAD DBO.ACTOR_TITLE
insert into actor_title 
(
	 actor_id
	,title_id
	,insert_date
	,updated_date
)
select 
	a.actor_id 
	,t.title_id 
	,current_timestamp 
	,current_timestamp 
from raw_data rd 
left join title t on t.title_name  = rd.title 
left join actor a on rd."cast"  like '%' || a.actor_name || '%'
where rd."cast"  is not null and a.actor_name is not null
order by t.title_id, a.actor_id 



-- LOAD DBO.director_title 
insert into director_title 
(
	 director_id
	,title_id
	,insert_date
	,updated_date
)
select 
	a.director_id 
	,t.title_id 
	,current_timestamp 
	,current_timestamp 
from raw_data rd 
left join title t on t.title_name  = rd.title 
left join director a on rd."cast"  like '%' || a.director_name || '%'
where rd."cast"  is not null and a.director_name is not null
order by t.title_id, a.director_id 


/**************** Data corrections for app tables ****************/

--cleans up bad actor names
delete from actor a 
where actor_id = 47291
or length(actor_name) = 1

-- cleans up bad director data.
delete from director 
where length(director_name) = 1 or director_id  = 27264;