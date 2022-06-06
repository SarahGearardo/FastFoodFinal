# Data Cleaning Steps

### Income File

1. Counted number of rows (1000). Realized that the code provided by kaggle to read in and display this data was only showing us the first 1000 rows, so had to re-import and change the encoding for it to display correctly. 
2. Removed duplicates and unwanted columns, dropped null values, and removed DC and PR from list, leaving us with 14,664 unique zip codes.
3. Added leading zeros where necessary so that all zip codes were five numbers in length.
3. Visualized unique zip codes on a map using Google API.
4. Created a list of the unique zip codes and exported that as a csv to use for the Yelp API requests.
5. Subdivided that list of zip codes into several smaller csv files in an attempt to avoid errors from Yelp's API.


### Yelp API Results

1. Created code with nested for loops to extract "fast food" restaurant names, adresseses, types, and zip codes from Yelp.
2. Attempted to run through the full file of zip codes but repeatedly returned an error. 
3. Ran several smaller blocks of zip codes, with varying results, trying to find the appropriate quantity to feed to the Yelp API at a time. 
4. Eventually decided to narrow scope of search down to eight states - CA, CO, FL, IL, NY, TN, TX, and VA.
    - Also had to divide the zip codes of CA and TX into two separate files each because Yelp kept returning an error toward the end of the list when more than 1,000 zip codes were run at a time. 
5. After successfully running the zip codes for the eight selected states through the Yelp API, received the following number of results:
  
     State  # of Zips   # of Results
   
    - CA:      1,101       10,261
    - CO:        228        2,393  
    - FL:        667          480  *ran this one twice because result was suspicously low but returned same amount
    - IL:        605        2,512
    - NY:        797        5,277
    - TN:        310          469
    - TX:      1,019        3,969
    - VA:        394        2,245

Totals: 8      5,121       27,606  

6. Used Python's "GLOB" to easily join all 10 files together into a single DataFrame.
    - It should be noted that there was some unexplained data loss at this point: the raw count of Yelp results was 27,606 but the DataFrame resulting from "globbing" all the files together only had 27,458 rows. In total, 148 results disappeared from the raw data. 
7. Removed duplicate results, which reduced the results to 13,248.
8. Converted the zip code and address columns to strings and then used regex to remove the unnecessary formatting. 


 ## Postgres

 1. Joined the Yelp and HH Income tables together and dropped the address, latitude, longitude, and standard deviation columns because they were no longer needed.
 2. In deciding which of the two zip code columns to drop, discovered that the the HH Income file included 1,164 rows with null values for zip code. Since we dropped all null values during initial cleaning of that dataset, we assume that this must indicate that some restaurants were located in zip code areas that did not appear in the HH Income dataset. We changed our join from FULL to INNER to remove these null values, which further reduced our dataset to 12,084.


## ML

We noticed when creating an initial scatter plot that the max median income caps out at 300,000 in the dataset and that a large number of data points were clustered along that line. We thought this might be skewing the data so decided to run a second linear regression analysis without those points to see if they affected the relationship between our x and y values. 


#### Notes 

According to the US Census Bureau, USPS Zip codes are not physically- or politically-defined features but a collection of mail delivery routes. In other words, the only thing that distinguishes one zip code from another is the post office that services that area. Despite this, zip codes often represent a kind of proxy for socio-economic status because people of similar economic means tend to live near each other. 








* only populated areas are included in the Census data


Useful websites:

YELP API Tutorial: https://www.youtube.com/watch?v=GJf7ccRIK4U

YELP API Documentation: https://www.yelp.com/developers/documentation/v3/business_search    