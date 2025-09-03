# DevTinder APIs 

## authRouter
-POST - /signup
-POST - /login
-POST - /logout

## profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

## connectionReqRouter
-POST /request/send/:status/:userID
-POST /request/review/:status/:requestID


## userRouter
-GET /user/connections
-GET /user/requests/received
-GET /user/feed



status - ignore , intrested, accepted , rejected