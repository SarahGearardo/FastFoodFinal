
-- Creating table for HH Income
CREATE TABLE Household_Income (
     state_ab VARCHAR,
     city VARCHAR,
	 zip_code_H INT,
	 latitude FLOAT,
	 longitude FLOAT,
	 median INT,
	 stdev INT,
     PRIMARY KEY (zip_code_H)
);


drop table Household_Income cascade;
drop table yelp_restaurants cascade;

 
-- Creating table for Yelp FF Restaurants
CREATE TABLE Yelp_Restaurants (
     restaurant VARCHAR,
     res_type VARCHAR,
	 address VARCHAR,
	 zip_code_Y INT
);

drop table joined_tables cascade;


-- Joining the two tables on Zip Code and counting density
SELECT zip_code_h, count(restaurant), cast(median as money)
INTO joined_tables
FROM yelp_restaurants as yp
INNER JOIN Household_Income as hi
ON (yp.zip_code_Y = hi.zip_code_H)
GROUP BY zip_code_h;

select * from joined_tables;

drop table res_type cascade;
 
-- Joining the two tables on Zip Code with restaurant type
SELECT zip_code_h, res_type, cast(median as money)
INTO res_type
FROM yelp_restaurants as yp
INNER JOIN Household_Income as hi
ON (yp.zip_code_Y = hi.zip_code_H)
GROUP BY zip_code_h, res_type
ORDER BY zip_code_h;


select * from res_type;




explanation for ML error: https://rotadev.com/accuracy-score-valueerror-cant-handle-mix-of-binary-and-continuous-target-dev/





-- Creating table for hotdogs
CREATE TABLE hotdogs (
    index int, 
	type VARCHAR,
     state VARCHAR,
	 zip_code float,
	 median float
);

drop table hotdogs;

select * from hotdogs;

-- Counting hotdog density
SELECT zip_code, count(type), median
INTO hotdog_count
FROM hotdogs
group by zip_code, median;


select * from hotdog_count;

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
drop table mex;
-- Creating table for mex
CREATE TABLE mex (
    index int, 
	type VARCHAR,
     state VARCHAR,
	 zip_code float,
	 median float
);

-- Counting mex density
SELECT zip_code, count(type), median
INTO mex_count
FROM mex
group by zip_code, median;


select * from mex_count;
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-- Creating table for delis
CREATE TABLE delis (
    index int, 
	type VARCHAR,
     state VARCHAR,
	 zip_code float,
	 median float
);

-- Counting deli density
SELECT zip_code, count(type), median
INTO deli_count
FROM delis
group by zip_code, median;


select * from deli_count;

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-- Creating table for burgers
CREATE TABLE burgers (
    index int, 
	type VARCHAR,
     state VARCHAR,
	 zip_code float,
	 median float
);

-- Counting burger density
SELECT zip_code, count(type), median
INTO burger_count
FROM burgers
group by zip_code, median;


select * from burger_count;
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-- Creating table for pizza
CREATE TABLE pizza (
    index int, 
	type VARCHAR,
     state VARCHAR,
	 zip_code float,
	 median float
);

-- Counting burger density
SELECT zip_code, count(type), median
INTO pizza_count
FROM pizza
group by zip_code, median;


select * from pizza_count;




