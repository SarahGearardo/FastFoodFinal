# You Are Where You Eat - The (Potential) Relationship between Fast Food and Income by Zip Code


## Overview

In the US, fast food restaurants are generally thought of as "cheap food" and are often associated with low-income areas in people's minds. We will use machine learning to investigate if there is indeed a significant correlation between median income and density of chain fast food restaurants (CFFRs) by zip code. 

We chose a subset of eight states (CA, CO, FL, IL, NY, TN, TX, and VA) to run our analysis on in order to keep the scope of the project manageable, given the project's time constraints.

## Reason

We chose this topic because it sounded interesting and offered a good way to test assumptions around socio-economic status and food options. 

## Data Sources

1. Census Data on US Household Income Statistics for 2011-2015 sourced from Kaggle.com

2. Restaurant locations scraped from Yelp.


## Hypothesis

We propose that there is a strong negative correlation between density of CFFRs and median income level per zip code. 

## GitHub

Description of communication protocols:

We will use a combination of class Zoom time and group-specific Slack messaging as primary communication methods. When a disagreement arises, we will collaborate on a mutually-agreeable solution that includes all viewpoints and considerations. If we cannot resolve a concern, we will request guidance from a TA or the instructor, as appropriate. 

## Machine Learning

We will use supervised learning for this project, specifically using a linear regression model to identify relationships between the data. 

The hypothesis we want to test is whether density of fast food restaurants (x) has an effect on the median income level (y) of the zip code we are considering. 

If the data and time permit, we will also attempt to parse out types of restaurants to see if there are any differences in preference between income levels for certain chains or types of food. 

## Database

We will use Postgres and PgAdmid to join and query the data. 


## Limitations
- We are dependent on Yelp for what constitutes a "fast food" restaurant. 
- There could be duplicates in the Yelp results.







