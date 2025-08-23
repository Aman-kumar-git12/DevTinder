Create a repository
- Initialize the repository
- node_modules, package.json, package-lock json
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /test, /hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde (^ vs ~ )



- initialize git
- gitignore
- Create a remote repo on github
- Push all code to remote origin
- Play with routes and route extensions ex. /hello, / , hello/2, /xyz
- Order of the routes matter a lot
- Install Postman app and make a test API call
- write a logic to handle GET , POST , PATCH , DELETE , API Calls and test them on postman

- mMiltiple ROute handler
- next()
- next funtion and error along with res.send()
- app.use("/route", rh1 , [rh2 , rh3], rh4)
- how request js basically  handles requests bihind the scene
- diff between app.use and app.all
- wrtie a dummy auth middleware for all the user routes except user/login

- create free cluster on MongoDB official website (Mongo Atlas)
- Connection your application to the database/devTinder
- call the connectDB function before strting application on 7777
- create UserSchema and UserModel
- create POST signup to add the dat in database
- push some documents using api calls from postman
- Error handling using try/catch

- difference between json obj and javascript obj
- add the express json midddleware to your app
- Make your signup api dynamic to recieve data from postman
- Api - get user by email
- API - get /feed all the data of database
- API - get user by findById
- Differene between Put and Patch
- API - Update the user
- Explore the documeantion
- What are the option in a Model.findOneAndUpdate method , explore more about it
- API - update the user with email id
- API level validation for each field

- Validate data for the signup API
- install package
- create passwordHash using bcrypt.hash and save the user encrypted password


- create login api and write the logic by your own
- compare password and throw error if email or password is invalid

- install cookie - parse
- just send dummy cookie to user
- create get profile and save and check if you get the cookie back
- in login api,after email adn jwt validation create jwt token and send it to the user in cookie
-read the cookie inside your profile api and find the logged in user