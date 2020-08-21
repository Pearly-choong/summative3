# Niche Market App (C2C Online Baking Goods) - Full Stack Application
## Group Project by Vandy, Pearly and Krisitne - Yoobee Module3 Summative Assessment

This project is to work as a team to build an application that is intuitive to use and displayed data from an API in an easily understandable representation. 

Full stack application works on both ends front and back. You can fetch and manipulate backend data through user interface in Browser. Alternatively, you can use Postman to monitor the request and response.

## To run this project
(Make sure Node.js is installed)

Step 1 – Clone this project to www folder (in Windows) or htdocs folder (in MAC )
git clone https://github.com/Vandy1104/summative3.git


Step 2 – Install packages
 After cloning project folder use npm i (On both prompts - frontEnd and backEnd inside summative3 prompt)


Step 3 – Mongodb
You should have a mongodb account. The URI connection string needs username, password and cluster name with attached id. If not, create an account and get the uri string from https://www.mongodb.com/


Copy the template_config.json file and rename it to config.json and add your username, password and clustername with its id. (Inside both frontEnd folder and backEnd folder)


Step 4 - Run the project
You should have installed nodemon globally. if not run npm install nodemon -g


use the legacy version in vagrant set up
nodemon -L index.js


use this in non-vagrant set up
nodemon index.js


Access in the browser -
use your localhost to view the app
Step 5 - To see the home page - http://localhost/summative3/frontEnd/
or use IP address in the place of localhost.

 

Authentication -
Only users who has a login username and password can edit profile and manipulate the products such as add, update and delete. Otherwise, register as a new user, then login.

For Checking Backend endpoints functionality -
In postman use - localhost:3000 or use IP in the place of localhost (/relatedendpoint after port number)



Step 6 - Endpoints
Endpoints	Description	Acceptable values	Method
/addComment/p=	       add new comment		            POST

/allComments/p=	      get comment by product id	   GET

/allProducts/u=	      get product by user id		     GET

/allProducts/cat=	    get product by category		    GET

/user/u=         	    get user by user id		        GET

/allProducts/flavour=	get product by flavour	    	 GET

/addProduct	          Adding a product in db		     POST

/allProducts	         View products	               GET

/updateProduct/      	Updating a product	          PATCH

/deleteProduct/      	Delete a product	            DELETE

/registerUser/       	register user	               POST

/loginUser           	login the user              	POST

/updateUser/	         update user	                 PATCH

/allProducts/p=	      get product by product id	   GET

Step 7 - Mongodb
To see data being posted,updated or deleted, click on cluster->collections->summative3db->users/ products or comments respectively
