
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

-- Joining the two tables on Zip Code
-- Joining the two tables on Zip Code
SELECT zip_code_h, count(restaurant), cast(median as money)
INTO joined_tables
FROM yelp_restaurants as yp
INNER JOIN Household_Income as hi
ON (yp.zip_code_Y = hi.zip_code_H)
GROUP BY zip_code_h;
