# Tiny URL

## GOAL : ``Provide an application that generates a shorter url for a longer url which acts a proxy for the longer url`` 

### Links:
Please use the below link to access the application on heroku
[URL-Shortener](https://urlshortnerapp.herokuapp.com)

### Technologies Used :

 1. **Server Side:**
    * Node.
    * Mongoose.
    * Express.
    * md5 lib.

    
 2. **Database:**
    * MongoDB
     
   
### Installation guide

1. Clone the repository.
2. Install npm. [CLI]
3. Open command prompt and navigate to the cloned directory.
4. Execute npm install.
5. Configure Mongo DB using the following link 
https://www.mongodb.com/download-center/v2/community
6. Start mongo Db server using commands ``mongod`` in command prompt and ``mongo`` in another.
7. Run node.js application using ``node server``
8. Open the localhost at 5500 port.
9. Access the application directly deployed on cloud(heroku) using the following url 
[URL-Shortener](https://urlshortnerapp.herokuapp.com)

#### API Documentation :

Short URL:

1. PUT:
Create a new url using- ``\api``  <br>
Pass the long url in body. Also returns the short URL in response.

2. GET:
Redirects to the long url using - ``\{tinyurl}``
returns Not Found (404) in response if not present.

3. GET:
Get tiny url and the long url using- ``\api\{tinyurl}``
Note: This should be removed as it can be bad for secured links. 

4. DELETE:
Delete the short url using : ``\api\{tinyurl}``

Tested manually using POSTMAN.

#### Addition :
A small UI for user feasibility

<img src="https://github.com/rastogi-s/Tiny-URL/blob/master/Capture.JPG?raw=true" />


