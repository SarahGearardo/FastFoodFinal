# Data Cleaning Steps

### Income File

1. Counted number of rows (1000). Realized that the code provided by kaggle to read in and display this data was only showing us the first 1000 rows, so had to re-import and change the encoding for it to display correctly. 
2. Removed duplicates, dropped null values, and removed DC and PR from list, leaving us with 14,664 unique zip codes.
3. Added leading zeros where necessary so that all zip codes were five numbers in length.
3. Visualized unique zip codes on a map using Google API.
4. Created a list of the unique zip codes and exported that as a csv to use for the Yelp API requests.
5. Subdivided that list of zip codes into several smaller csv files in an attempt to not surpass Yelp's limit of 5,000 API calls in a day. 



### Yelp API Results

1. Created code with nested for loops to extract "fast food" restaurant names, adresseses, types, and zip codes from Yelp.
2. Attempted to run through the full file of zip codes but returned an error. 
3. Ran several smaller blocks of zip codes, with varying results, trying to find the appropriate quantity to feed to the Yelp API at a time. 
4. Eventually decided to narrow scope of search down to eight states - CA, CO, FL, IL, NY, TN, TX, and VA.
    - Also had to divide the zip codes of CA and TX into two separate files, each, because Yelp kept returning an error toward the end of the list when more than 1,000 zip codes were run at a time. 
5. After successfully running the zip codes for the eight selected states through the Yelp API, received the following number of results:
  
     State  # of Zips   # of Results
   
    - CA:      1,101        8,097
    - CO:        228        2,393  
    - FL:        667          480  *ran this one twice because result was suspicously low but returned same amount
    - IL:        605        2,512
    - NY:        797        5,277
    - TN:        310          469
    - TX:      1,019        3,969
    - VA:        394        2,245

6. Used Python's "GLOB" to easily join all 10 files together into a single DataFrame.
    - It should be noted that there was some unexplained data loss at this point: the raw count of Yelp results was 27,606 but the DataFrame resulting from "globbing" all the files together only had 27,458 rows. In total, 148 results disappeared from the raw data. 
7. Converted the zip code and address columns to strings and then used regex to remove the unnecessary formatting. 









Useful websites:

YELP API Tutorial: https://www.youtube.com/watch?v=GJf7ccRIK4U

YELP API Documentation: https://www.yelp.com/developers/documentation/v3/business_search    